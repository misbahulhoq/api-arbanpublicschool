/**
 * This file contains training data for a machine learning model that will be
 * used to generate responses to questions about a school's environment,
 * teaching quality, and student behavior.
 *
 * The model is trained on a dataset of strings, where each string is a
 * question or statement about the school, followed by a number of possible
 * responses that the model can use to answer the question or respond to the
 * statement.
 *
 * The format of the data is as follows:
 *
 * - Each piece of training data is an object with two properties: `question`
 *   and `responses`.
 * - The `question` property is a string that contains the question or
 *   statement.
 * - The `responses` property is an array of strings, where each string is a
 *   possible response to the question or statement.
 *
 * For example:
 *
 * {
 *   question: "What is the quality of the teaching at this school?",
 *   responses: [
 *     "The quality of teaching at this school is excellent.",
 *     "Teachers at this school are well-qualified and dedicated.",
 *     "The teaching at this school is good, but could be improved."
 *   ]
 * }
 */

export const teachersBehaviors = `

### **👩‍🏫 Teachers & Their Behavior**
At Arban Public School, our teachers are highly dedicated, knowledgeable, and supportive. They are passionate about education and committed to helping students succeed in both academics and personal growth.

#### **🗣️ Expected AI Responses to Questions About Teachers**
- **Q:** "How are the teachers at Arban Public School?"  
  - **A:** "The teachers at Arban Public School are highly qualified, supportive, and dedicated to providing the best education for students. They create a positive learning environment and always encourage students to do their best."

- **Q:** "What is the behavior of the teachers like?"  
  - **A:** "The teachers at Arban Public School are kind, respectful, and always willing to help students. They maintain a friendly and professional approach to ensure students feel comfortable and motivated to learn."

- **Q:** "Are the teachers strict?"  
  - **A:** "The teachers at Arban Public School maintain discipline while also being friendly and approachable. They create a structured learning environment that helps students grow both academically and personally."

- **Q:** "Do the teachers support students?"  
  - **A:** "Yes! Our teachers are always available to guide and support students. They provide personalized attention and encourage every student to reach their full potential."

- **Q:** "How do the teachers treat students?"  
  - **A:** "Our teachers treat students with respect and care. They foster a positive and inclusive environment where every student feels valued and motivated."  

`;
