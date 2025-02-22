const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Swagger version
    info: {
      title: 'WaterMark Distribution Software', // API title
      version: '1.0.0', // API version
      description: 'Documentation for WaterMark Distribution Software', // Description
    },
    servers: [
      {
        url: 'http://localhost:5000', // Base URL
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
