import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listeController = {
  // Créer un nouvel enregistrement
  createListe: async (req, res) => {
    try {
      console.log("req.body", req.body);
      const liste = await prisma.liste.create({
        data: {
          date_du_jour: req.body.date_du_jour, // Correction de la clé
          formateur: req.body.formateur,
          nom_prenom: req.body.nom_prenom,
          heure_arriveer: req.body.heure_arriveer, // Correction de la clé
          signature: req.body.signature,
        },
      });
      res.status(201).json(liste);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création de la liste' });
    }
  },

  // Lire tous les enregistrements
  getAllListes: async (req, res) => {
    try {
      const listes = await prisma.liste.findMany();
      res.status(200).json(listes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des listes' });
    }
  },

  // Lire un enregistrement par ID
  getListeById: async (req, res) => {
    try {
      const { id_liste } = req.params;
      const liste = await prisma.liste.findUnique({
        where: {
          id_liste: parseInt(id_liste),
        },
      });
      if (!liste) {
        return res.status(404).json({ error: 'Liste non trouvée' });
      }
      res.status(200).json(liste);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la liste' });
    }
  },

  // Mettre à jour un enregistrement par ID
  updateListeById: async (req, res) => {
    try {
      const { id_liste } = req.params;
      const updatedListe = await prisma.liste.update({
        where: {
          id_liste: parseInt(id_liste),
        },
        data: {
          date_du_jour: req.body.date_du_jour || undefined,
          formateur: req.body.formateur || undefined,
          nom_prenom: req.body.nom_prenom || undefined,
          heure_arriveer: req.body.heure_arriveer || undefined,
          signature: req.body.signature || undefined
        },
      });
      res.status(200).json(updatedListe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la liste' });
    }
  },

  // Supprimer un enregistrement par ID
  deleteListeById: async (req, res) => {
    try {
      const { id_liste } = req.params;
      await prisma.liste.delete({
        where: {
          id_liste: parseInt(id_liste),
        },
      });
      res.status(204).send(); // Pas de contenu à renvoyer
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de la liste' });
    }
  },

  // Recherche d'une liste par nom_prenom
  getListesByNomPrenom: async (req, res) => {
    try {
      const { query } = req.query;
      const listes = await prisma.liste.findMany({
        where: {
          nom_prenom: {
            contains: query,
            mode: 'insensitive',
          },
        },
      });
      res.status(200).json(listes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la recherche des listes' });
    }
  },

  // Trier les listes
  getSortedListes: async (req, res) => {
    try {
      const { field, order } = req.query;
      const listes = await prisma.liste.findMany({
        orderBy: {
          [field]: order || 'asc',
        },
      });
      res.status(200).json(listes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des listes triées' });
    }
  }
};

export default listeController;
