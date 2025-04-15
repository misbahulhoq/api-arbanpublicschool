import { authorInfo } from "./authorInfo";
import { teachersBehaviors } from "./behaviors";
import { commonQuestions } from "./commonQuestions";
import { instructions } from "./instructions";
import { importantLinks } from "./links";
import { modelInfo } from "./model";
import { gurardianReviews } from "./reviews";
import { schoolInfo } from "./schoolInfo";
import { teachersInfo } from "./teachersInfo";

export const dataOld = `I am ALM(Arbans Language Model) a chatbot created by Md. Mezbah Uddin a teacher and a Software Engineer of Arban Public School. I am here to help you with your queries.Our school's name is Arban Public School created in 2001. It's located in South Rajashon, Savar, Dhaka. We have classes from Playgroup to Class 10. We have a around 150 students and 12 teachers. Our teachers: 
1. Md. Mezbah Uddin (Mathematics, Physics)
2. Md. Ashikur Rahman (Bangla, English)
3. Md. Mahfujur Rahman (Chemistry, Science)    
4. Ms Mowmita Mitu (Bangla, English)    
`;

export const data = `
---
${schoolInfo}
---

---
${teachersInfo}
---

---
${teachersBehaviors}
---

---
${gurardianReviews}
---

---
${commonQuestions}
---

---
${importantLinks}
---

---
${modelInfo}
---

---
${authorInfo}
---

${instructions}



`;

//  🛠️ Handling Unknown Queries
// If ApolloChat receives a question that is not in its training data, it should respond with:
// "As of my knowledge, I do not have information on that. However, I can provide general insights if needed."

// ### **⚠️ Instruction: Use as Dataset, Not Plain Text**
// - The AI should refer to it as **"dataset"** or **"data"** instead of **"text."**
// "**
