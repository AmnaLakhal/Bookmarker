const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookmarker API',
      version: '1.0.0',
      description: 'API pour gérer vos favoris web'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur de développement'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
