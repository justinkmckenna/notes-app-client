  const dev = {
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://ejav5kt3ta.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_rXepvcswV",
      APP_CLIENT_ID: "2m5l03gc8irqqogvdtuml2sbjo",
      IDENTITY_POOL_ID: "us-east-1:18491440-3333-4688-9eaa-dcd10b99ef9f"
    }
  };
  
  const prod = {
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://33h2shws89.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_pX6CkWdCX",
      APP_CLIENT_ID: "4u9ipoi4sta2j9trvhrl17hj4m",
      IDENTITY_POOL_ID: "us-east-1:605d7391-8482-49f0-bdc4-33b912afc106"
    }
  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default config;