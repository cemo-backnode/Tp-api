import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const listeController = {
  // Créer un nouvel enregistrement
  createListe: async (req, res) => {
    try {
      console.log("req.body",req.body)
      const liste = await prisma.liste.create({
        data: {
          "date_dujour":req.body.date_du_jour,
          "formateur":req.body.formateur,  
          "nom_prenom":req.body.nom_prenom,
          "heure_arriveer":req.body.heure_arriveer,
          "signature":req.body.signature,
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
      console.log("req.body",req.body);
      const updatedListe = await prisma.liste.update({
        where: {
          id_liste: parseInt(id_liste),
        },
        data: {
          "date_du_jour":req.body.date_du_jour || liste.date_du_jour,
          "formateur":req.body.formateur || liste.formateur ,
          'nom_prenom':req.body.nom_prenom || liste.nom_prenom,
          "heure_arriveer":req.body.heure_arriveer || liste.heure_arriveer,
          "signature":req.body.signature || liste.signature
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
};

module.exports = listeController;