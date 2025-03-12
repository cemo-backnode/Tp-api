// server.js
import express from 'express';
import routesListe from './routes/routesListe.js'; // Importation des routes
import setupSwagger from './swagger.js'; // Chemin vers votre fichier swagger.js

const app = express();
const port = 3000;

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Utiliser les routes importées
app.use('/api', routesListe); 

// Configuration de Swagger
setupSwagger(app);

// Route de base
app.get('/', (req, res) => {
  res.send('Bonjour, bienvenue sur le serveur Express!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});
