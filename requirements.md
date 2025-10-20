# Backend Requirements Specification: School Management System

This document outlines the backend requirements for a School Management System. The system's core features will be **Role-Based Access Control (RBAC)** and **automated result card generation**.

---

## 1. Core Technologies

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** A library like `Joi` or `express-validator`
- **Security:** `bcryptjs` for password hashing, `helmet` for security headers.
- **Language:** TypeScript (Recommended for type safety and scalability)

---

## 2. Functional Requirements

### 2.1 Authentication & Authorization (RBAC)

The system must support multiple user roles with distinct permissions.

- **User Roles:**

  - **Admin:** Superuser with full access to the system. Can manage all users, classes, subjects, and system settings.
  - **Teacher:** Can manage marks for their assigned subjects/classes, view student profiles in their classes, and take attendance.

- **Authentication Logic:**

  - Users must be able to register (Admin-only) and log in using an email/username and password.
  - Upon successful login, the server will issue a JWT containing the user's ID and role.
  - The server must include protected routes that can only be accessed with a valid JWT.
  - Implement a password reset/forgot password functionality.

- **Authorization Logic:**
  - An authorization middleware must check the user's role from the JWT on every request to a protected route.
  - The middleware will grant or deny access based on the permissions defined for that role. For example, a `Student` role cannot access a route to create a new `Teacher`.

### 2.2 User Management (Admin)

- The Admin must be able to perform **CRUD** (Create, Read, Update, Delete) operations on all user accounts (Teachers, Students).
- The system should allow the Admin to assign roles to users.
- The system should allow bulk creation of student accounts (e.g., from a CSV file).

### 2.3 Academic Structure Management (Admin)

- The Admin must be able to perform CRUD operations for:
  - **Classes** (e.g., Class 6, Class 7).
  - **Sections** (e.g., Section A, Section B).
  - **Subjects** (e.g., Mathematics, Physics).
- The Admin must be able to assign subjects to specific classes.
- The Admin must be able to assign a Teacher to a specific subject within a specific class/section.

### 2.4 Exam and Grade Management

- **Exam Creation (Admin):** The Admin should be able to create examination types (e.g., "Mid-term Exam", "Final Exam", "Class Test").
- **Marks Entry (Teacher):** A Teacher must be able to enter marks for students in the subjects and classes they are assigned to for a specific exam. The system should prevent a teacher from entering marks for unassigned subjects.
- **Grading System (Admin):** The Admin must be able to configure the grading scale (e.g., 80-100 = A+, 70-79 = A, etc.) and associated grade points.

### 2.5 Result Card Creation Logic

This is the core business logic of the application.

- **Calculation Engine:**

  - The system must be able to calculate the total marks for each subject.
  - It must automatically assign a letter grade and grade point for each subject based on the configured grading scale.
  - It must calculate the **Grade Point Average (GPA)** for the term. The formula to use is: `GPA = (Sum of (Grade Point * Subject Credits)) / (Total Subject Credits)`. For simplicity, you can start with each subject having equal credit.
  - It must determine the final result status (e.g., "Passed", "Failed").

- **Generation Endpoint:**
  - There should be a specific API endpoint (e.g., `POST /api/results/generate`) that takes a `studentId` and `examId`.
  - This endpoint will trigger the calculation engine and compile all necessary data (student info, marks list, grades, GPA, final status) into a single JSON object representing the result card.

---

## 3. Database Schema (MongoDB Models)

Here are the suggested Mongoose schemas:

- **User Model:**

  - `name: String`
  - `email: String (unique)`
  - `password: String (hashed)`
  - `role: Enum ['Admin', 'Teacher']`

- **Student Profile Model:**

  - `user: { type: Schema.Types.ObjectId, ref: 'User' }`
  - `studentId: String (unique)`
  - `class: { type: Schema.Types.ObjectId, ref: 'Class' }`
  - `section: String`
  - `guardianName: String`

- **Class Model:**

  - `name: String (e.g., "Class 10")`
  - `subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]`

- **Subject Model:**

  - `name: String (e.g., "Mathematics")`
  - `subjectCode: String (unique)`

- **Exam Model:**

  - `name: String (e.g., "Final Exam 2025")`
  - `class: { type: Schema.Types.ObjectId, ref: 'Class' }`
  - `date: Date`

- **Result Model:**
  - `student: { type: Schema.Types.ObjectId, ref: 'StudentProfile' }`
  - `exam: { type: Schema.Types.ObjectId, ref: 'Exam' }`
  - `marks: [{ subject: { type: Schema.Types.ObjectId, ref: 'Subject' }, obtainedMarks: Number }]`
  - `gpa: Number`
  - `status: Enum ['Passed', 'Failed']`

---

## 4. API Endpoints (RESTful)

A high-level overview of the API routes.

- `POST /api/auth/login`
- `GET /api/users` (Admin, Teacher)
- `POST /api/users` (Admin, Teacher - except Admin role)
- `GET /api/students/:studentId` (Admin, Teacher)
- `POST /api/classes` (Admin)
- `GET /api/classes/:classId/subjects`
- `POST /api/exams/:examId/marks` (Teacher, Admin)
- `GET /api/results/student/:studentId/exam/:examId` (Admin, Teacher, Student)

---

## 5. Non-Functional Requirements

- **Security:** All passwords must be hashed. Use environment variables for sensitive keys and database URIs. Implement rate limiting to prevent brute-force attacks.
- **Performance:** Use database indexing on frequently queried fields like `email`, `studentId`, etc.
- **Error Handling:** Implement a centralized error handling middleware to send consistent error responses (e.g., `{ "status": "error", "message": "..." }`).
- **Testing:**
  - Write **unit tests using Jest** for critical business logic, especially the GPA calculation engine.
  - Write **integration tests** for the API endpoints to ensure they work together correctly.
