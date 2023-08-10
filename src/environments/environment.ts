
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  fileServer: 'https://voces-files-s3-bucket.s3.amazonaws.com',
  cognito: {
    clientId: '6s909u4hcq1e5s80v6s36ojcar',
    region: 'us-east-1',
    domain: 'voces',
    uri: 'http://localhost:4200/authentication'
  },
};
