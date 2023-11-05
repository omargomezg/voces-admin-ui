export const configuration = {
  endpoint: 'https://api.diariolavoz.cl',
  fileServer: 'https://voces-files-s3-bucket.s3.amazonaws.com',
  cognito: {
    clientId: '6s909u4hcq1e5s80v6s36ojcar',
    region: 'us-east-1',
    domain: 'voces',
    uri: 'https://gato-gamboa.diariolavoz.cl/authentication'
  },
  sites: ['GRUPO_LA_VOZ', 'PAILLACO', 'VALDIVIA', 'PANGUIPULLI', 'LOS_LAGOS', 'LOS_RIOS', 'RANCO'],
  statuses: ['PUBLISHED', 'DRAFT', 'HIDDEN']
}
