export const configuration = {
  endpoint: 'http://localhost:8080',
  fileServer: 'https://voces-files-s3-bucket.s3.amazonaws.com',
  cognito: {
    clientId: 'ANY_CLIENT_ID'
  },
  sites: ['grupolavoz', 'paillaco', 'panguipulli', 'launion'],
  authors: [
    {alias: 'Omar Gomez', email: 'omar.fdo.gomez@gmail.com'},
    {alias: 'Francisco Lagos', email: 'flagos@gmail.com'}
  ],
  statuses: ['PUBLISHED', 'DRAFT', 'HIDDEN']
}
