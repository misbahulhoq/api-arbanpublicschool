"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.dataOld = void 0;
const authorInfo_1 = require("./authorInfo");
const behaviors_1 = require("./behaviors");
const commonQuestions_1 = require("./commonQuestions");
const instructions_1 = require("./instructions");
const links_1 = require("./links");
const model_1 = require("./model");
const reviews_1 = require("./reviews");
const schoolInfo_1 = require("./schoolInfo");
const teachersInfo_1 = require("./teachersInfo");
exports.dataOld = `I am ALM(Arbans Language Model) a chatbot created by Md. Mezbah Uddin a teacher and a Software Engineer of Arban Public School. I am here to help you with your queries.Our school's name is Arban Public School created in 2001. It's located in South Rajashon, Savar, Dhaka. We have classes from Playgroup to Class 10. We have a around 150 students and 12 teachers. Our teachers: 
1. Md. Mezbah Uddin (Mathematics, Physics)
2. Md. Ashikur Rahman (Bangla, English)
3. Md. Mahfujur Rahman (Chemistry, Science)    
4. Ms Mowmita Mitu (Bangla, English)    
`;
exports.data = `
---
${schoolInfo_1.schoolInfo}
---

---
${teachersInfo_1.teachersInfo}
---

---
${behaviors_1.teachersBehaviors}
---

---
${reviews_1.gurardianReviews}
---

---
${commonQuestions_1.commonQuestions}
---

---
${links_1.importantLinks}
---

---
${model_1.modelInfo}
---

---
${authorInfo_1.authorInfo}
---

${instructions_1.instructions}



`;
//  🛠️ Handling Unknown Queries
// If ApolloChat receives a question that is not in its training data, it should respond with:
// "As of my knowledge, I do not have information on that. However, I can provide general insights if needed."
// ### **⚠️ Instruction: Use as Dataset, Not Plain Text**
// - The AI should refer to it as **"dataset"** or **"data"** instead of **"text."**
// "**
