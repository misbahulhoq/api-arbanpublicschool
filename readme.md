# Docs

## Deployment

### Before deploying to vercel the following rules must be followed.

- run `npm run build` or `pnpm build` locally to create a build version.
- Then push it to github, the rest is up to vercel.

## Tools

## Typescript along with node.js and express

- Typescript helps us in catching errors earlier as well as writing clean code.
- In order to create an express-node app with typescript we need to install the following packages
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev), [typescript](https://www.npmjs.com/package/typescript)
- Also we need some @types/package-name dependencies for different packages.
- Typescript config file and build method has already been setup in this project.

### Jest

- This library is used for automating the testing process
- As this library is used only for testing in the development environment, we don't need to install this as a main dependency, installing it as a devDependency will get the job done.
- [@jest/globals](https://www.npmjs.com/package/@jest/globals), [ts-jest](https://www.npmjs.com/package/ts-jest), [jest](https://www.npmjs.com/package/jest), [@types/jest](https://www.npmjs.com/package/@types/jest), [supertest](https://www.npmjs.com/package/supertest), [@types/supertest](https://www.npmjs.com/package/@types/supertest) are all the required devDependenices for jest as I am using typescript
- `jest` this command will run the test only once, if we need to watch on file changes we have to use `--watchAll`
- I have created two different config files for jest. One will be used only for testing directly the typescript code and the second config file will be used for the production ready code which is located in the /dist folder

## Endpoints

### /auth

#### Post methods

- in /signup route providing `uid`, `email`, `password`, `role` is compulsory. Else 400 status code is sent. The provided `uid` will be first matched with the database, if the uid is not found in the database ,[!400] status will be sent.
- if a valid request is sent the user is gonna be signed up. One can't use one `uid` twice.
- `passwords` are hashed before it is saved to the database for security reasons.
- in /login route if valid `uid` and `password` is sent, an `authToken` is generated and sent in the header.

#### Get Methods

- in /me route the client must has to provide a valid `authToken`. 400 status is sent if no token provided from the client and 401 is sent if the sent token is not valid.

### /students

#### Post methods

- in /students route the client must provide these properties `name`, `uid`, `class`, `phone`, `fathersName`, `mothersName`. All of these are strings
- Any invalid property related errors will be sent from the server, the client must handle those errors properly

#### Get method(s)

- /students/uid route will send a single student's info. If no student found it will return 404.
- To get a student info providing valid authToken from the frontend is a must.

### /numbers [This route is for adding marks/numbers]

#### Post methods

- in /numbers route the client must provide uid, examCode, exam[e.g. 1st tutorial], an array of numbers which will contain multiple objects with key/value pairs. Each object will have 3 properties-> `sub` short for Subject, `fullMarks`, `obtMarks`
- Exam codes and meanings are Year01 for First Tutorial, Year02 for First Semester, Year03 for Second Tutorial, Year04 for Second Semester, Year05 for Third Tutorial, Year06 for Third Semester.
- In order to post a number the client must be a teacher.

#### Get method(s)

- in /number route the server sends all the numbers that are saved in the database.
- To get all the numbers the client must be a teacher.
