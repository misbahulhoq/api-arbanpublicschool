# Docs

## Tools docs

### Jest

- This library is used for automating the testing process
- As this library is used only for testing in the development environment, we don't need to install this as a main dependency, installing it as a devDependency will get the job done.
- [@jest/globals](https://www.npmjs.com/package/@jest/globals), [ts-jest](https://www.npmjs.com/package/ts-jest), [jest](https://www.npmjs.com/package/jest), [@types/jest](https://www.npmjs.com/package/@types/jest), [supertest](https://www.npmjs.com/package/supertest), [@types/supertest](https://www.npmjs.com/package/@types/supertest) are all the required devDependenices for jest as I am using typescript
- `jest` this command will run the test only once, if we need to watch on file changes we have to use `--watchAll`
