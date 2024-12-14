declare namespace NodeJS {
  interface EnvVariables {
    jwtPrivateKey: string;
    dbUserName: string;
    dbPass: string;
    email_address: string;
    email_pass: string;
  }
}

export interface EnvVariables {
  jwtPrivateKey: string;
  dbUserName: string;
  dbPass: string;
  email_address: string;
  email_pass: string;
}
