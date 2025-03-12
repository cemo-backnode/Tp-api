import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', // Version de l'OpenAPI
    info: {
      title: 'Event Management API', // Titre de votre API
      version: '1.0.0', // Version de votre API
      description: 'API pour gérer les listes de présence', // Description de votre API
    },
    servers: [
      {
        url: 'http://localhost:3001', // URL de votre serveur
      },
    ],
  },
  apis: ['./src/routes/routesListe.js'], // Chemin vers les fichiers de routes
};

// Génération des spécifications Swagger
const specs = swaggerJsdoc(options);

// Exportation d'une fonction pour configurer Swagger UI
export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
