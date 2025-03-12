import express from 'express';
import { listeController } from '../controller/controller.js'; // Importation correcte

const router = express.Router();

// Récupérer toutes les listes
router.get('/liste', listeController.getAllListes);

// Créer une nouvelle liste
router.post('/liste', listeController.createListe);

// Récupérer une liste par ID
router.get('/liste/:id', listeController.getListeById);

// Mettre à jour une liste par ID
router.put('/liste/:id', listeController.updateListeById);

// Supprimer une liste par ID
router.delete('/liste/:id', listeController.deleteListeById);

// Recherche d'une liste par nom_prenom
router.get('/liste/search', listeController.getListesByNomPrenom);

// Trier les listes
router.get('/liste/sort', listeController.getSortedListes);

export default router;
