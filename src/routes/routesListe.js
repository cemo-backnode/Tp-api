import express from 'express';
import { listeController } from '../controllers/controller.js'; // Importation nommée

const router = express.Router();

/**
 * @swagger
 * {
 *   "tags": [
 *     {
 *       "name": "Liste",
 *       "description": "API pour gérer les listes"
 *     }
 *   ]
 * }
 */

/**
 * @swagger
 * {
 *   "path": "/liste",
 *   "get": {
 *     "summary": "Récupérer toutes les listes",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "query",
 *         "name": "sort",
 *         "required": false,
 *         "description": "Champ par lequel trier (ex: date_du_jour, nom_prenom)",
 *         "schema": {
 *           "type": "string"
 *         }
 *       },
 *       {
 *         "in": "query",
 *         "name": "search",
 *         "required": false,
 *         "description": "Termes de recherche dans le nom_prenom",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "Liste des entrées"
 *       }
 *     }
 *   }
 * }
 */
router.get('/liste', listeController.getAllListes);

/**
 * @swagger
 * {
 *   "path": "/liste",
 *   "post": {
 *     "summary": "Créer une nouvelle entrée",
 *     "tags": ["Liste"],
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "nom_prenom": {
 *                 "type": "string"
 *               },
 *               "heure_arrivee": {
 *                 "type": "string"
 *               },
 *               "signature": {
 *                 "type": "string"
 *               }
 *             },
 *             "required": ["nom_prenom", "heure_arrivee", "signature"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "201": {
 *         "description": "Entrée créée"
 *       }
 *     }
 *   }
 * }
 */
router.post('/liste', listeController.createListe);

/**
 * @swagger
 * {
 *   "path": "/liste/{id}",
 *   "get": {
 *     "summary": "Récupérer une entrée par ID",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "path",
 *         "name": "id",
 *         "required": true,
 *         "description": "ID de l'entrée",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "Entrée trouvée"
 *       },
 *       "404": {
 *         "description": "Entrée non trouvée"
 *       }
 *     }
 *   }
 * }
 */
router.get('/liste/:id', listeController.getListeById);

/**
 * @swagger
 * {
 *   "path": "/liste/{id}",
 *   "put": {
 *     "summary": "Mettre à jour une entrée par ID",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "path",
 *         "name": "id",
 *         "required": true,
 *         "description": "ID de l'entrée",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }
 *     ],
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "nom_prenom": {
 *                 "type": "string"
 *               },
 *               "heure_arrivee": {
 *                 "type": "string"
 *               },
 *               "signature": {
 *                 "type": "string"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "Entrée mise à jour"
 *       },
 *       "404": {
 *         "description": "Entrée non trouvée"
 *       }
 *     }
 *   }
 * }
 */
router.put('/liste/:id', listeController.updateListeById);

/**
 * @swagger
 * {
 *   "path": "/liste/{id}",
 *   "delete": {
 *     "summary": "Supprimer une entrée par ID",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "path",
 *         "name": "id",
 *         "required": true,
 *         "description": "ID de l'entrée",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }
 *     ],
 *     "responses": {
 *       "204": {
 *         "description": "Entrée supprimée"
 *       },
 *       "404": {
 *         "description": "Entrée non trouvée"
 *       }
 *     }
 *   }
 * }
 */
router.delete('/liste/:id', listeController.deleteListeById);

/**
 * @swagger
 * {
 *   "path": "/liste/search",
 *   "get": {
 *     "summary": "Rechercher des entrées par nom_prenom",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "query",
 *         "name": "query",
 *         "required": true,
 *         "description": "Terme de recherche dans le nom_prenom",
 *         "schema": {
 *           "type": "string"
 *         }
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "Liste des entrées correspondant à la recherche"
 *       }
 *     }
 *   }
 * }
 */
router.get('/liste/search', listeController.getListesByNomPrenom);

/**
 * @swagger
 * {
 *   "path": "/liste/sort",
 *   "get": {
 *     "summary": "Récupérer toutes les listes triées",
 *     "tags": ["Liste"],
 *     "parameters": [
 *       {
 *         "in": "query",
 *         "name": "field",
 *         "required": true,
 *         "description": "Champ par lequel trier (ex: date_du_jour, nom_prenom)",
 *         "schema": {
 *           "type": "string"
 *         }
 *       },
 *       {
 *         "in": "query",
 *         "name": "order",
 *         "required": false,
 *         "description": "Ordre de tri (asc ou desc)",
 *         "schema": {
 *           "type": "string",
 *           "enum": ["asc", "desc"]
 *         }
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "Liste des entrées triées"
 *       }
 *     }
 *   }
 * }
 */
router.get('/liste/sort', listeController.getSortedListes);

export default router;
