/**
 * This file contains information about teachers at Arban Public School.
 *
 * The information is stored in the `teachersInfo` variable, which is an array of objects.
 * Each object represents a teacher and contains the following properties:
 *
 * - `name`: The teacher's name
 * - `about`: A brief description of the teacher
 * - `phone`: The teacher's phone number
 * - `email`: The teacher's email address
 * - `photoUrl`: The URL of the teacher's photo
 *
 * The information in this file is used by the ApolloTalk AI model to generate responses to questions about the school's teachers.
 *
 */

export const teachersInfo = `

### **📝 Teacher Information at Arban Public School**  

#### **👩‍🏫 List of Teachers at Arban Public School**

- **Md Anower Hossain**  
    - The principal and the founder of Arban Public School. 
    
- **Akhi Haque**  
 - **Subjects Taught:** Religion, English      

- **Md Mezbah Uddin** (Should Also be recognized as Misbah, misbah, mishbah misba, misba)  
   - **Educational Qualification:** B.Sc in Soil Science, National University  
   - **Subjects Taught:** Higher Math, Mathemetics, Physics  

- **Md Meherab Hossain Ashik**  
   - **Educational Qualification:** BBA (Accounting), National University  
   - **Subjects Taught:** English, Bangla, Accounting  

- **Md Meherab Hossain Ashik**  
   - **Educational Qualification:** BBA (Accounting), National University  
   - **Subjects Taught:** English, Bangla, Accounting

- **Md Mahfujur Rahman Munna**  
   - **Educational Qualification:** BA (English ) running at National University.  
   - **Subjects Taught:** Mathematics, Chemistry, ICT   

- **Tajnin Akter**  
   - **Educational Qualification:** MA (Islamic History and Culture), National University  
   - **Subjects Taught:** B.G.S (Bangladesh and Global Studies) 

- **Mowmita Islam Mitu**  
    - **Subjects Taught:** Religion, Science, Social Science

- **Ms Jhorna Akhter**   
  - **Educational Qualification:** BA (Bangla), National University  
   - **Subjects Taught:** Biology
   
- **Amor Biswas**
    - **Subjects Taught:** Accounting, English

- **Mahmuda Akter Jhorna**
  - **Educational Qualification:** M.Sc (Mathematics), National University  
    - **Subjects Taught:** Math, Biology

- **Khadija Akter**
    - **Subjects Taught:** Religion, Science, Social Science



---

### **📝 Instructions for ApolloTalk**  
If a user asks about **teachers at Arban Public School**, ApolloTalk should use the information provided above to form responses.

#### **Expected AI Responses:**  
- **Q:** "Who teaches [subject] at Arban Public School?"  
  - **A:** "[Teacher Name] teaches [subject] at Arban Public School. They have a [Degree] from [University] and are highly experienced in teaching this subject." 
  
- **Q:** "Teachers at Arban Public School"  
  - **A:** "Tell the names of Arban Public School teachers in bullet list. "    

- **Q:** "What qualifications do teachers at Arban Public School have?"  
  - **A:** "Teachers at Arban Public School hold degrees from reputable universities and have expertise in their respective subjects. For example, [Teacher Name] has a [Degree] from [University] and teaches [subject]."  

- **Q:** "How experienced are the teachers?"  
  - **A:** "The teachers at Arban Public School are qualified and experienced enough in their subjects."  

#### **Important Note for ApolloTalk:**  
- If a user asks about a teacher who is **not listed** in the dataset, ApolloTalk should respond with:  
  _"The provided dataset does not contain information about that teacher. Please check with the school for more details."_  
- Do not repeat the same information for each teacher. Provide **unique details** for each teacher based on the dataset.  


`;
