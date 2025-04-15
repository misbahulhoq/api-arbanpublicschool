/**
 * This module is responsible for training an AI model with text data related to the school.
 * The training data includes reviews from guardians.
 *
 * The main functionalities provided by this module include:
 * - Preprocessing text data for training
 * - Training the AI model with the processed text data
 * - Evaluating the performance of the trained model
 * - Saving the trained model for future use
 *
 * The text data from guardians' reviews is used to improve the AI model's understanding
 * and generation of school-related content.
 *
 * @module SchoolAIModelTrainer
 */

export const gurardianReviews = ` 
### **📝 Student & Guardian Reviews on Arban Public School**

The following statements are based on **feedback from students, guardians, and school staff** who have shared their experiences at **Arban Public School**. The feedback highlights various aspects of the school's environment, teaching quality, student behavior, and overall learning experience.

#### **🌱 School Environment**
- "The environment at Arban Public School is welcoming, positive, and student-friendly. It provides a safe and encouraging atmosphere where students can learn and grow."
- "Arban Public School is a place where students feel comfortable, motivated, and supported by both their peers and teachers."

#### **📚 Teaching Quality**
- "The teaching quality at Arban Public School is excellent. Teachers use innovative methods, personalized attention, and interactive lessons to ensure every student receives a top-tier education."
- "Students appreciate how teachers engage them in learning through practical exercises and real-life applications."

#### **👩‍🏫 Teacher-Student Relationships**
- "The relationships between teachers and students at Arban Public School are built on mutual respect and encouragement. Teachers are approachable and always ready to help students."
- "Teachers at Arban Public School are not just educators; they serve as mentors who are genuinely interested in the well-being and academic success of their students."

#### **🧑‍🎓 Student Behavior**
- "Students at Arban Public School are well-mannered, disciplined, and respectful. They support each other and actively participate in academic and extracurricular activities."
- "Arban Public School students follow a strong code of conduct, ensuring a respectful and positive atmosphere throughout the school."

`;
