const express = require("express");
const joueur = require("../modele/joueur");
const partie = require("../modele/partie");

async function getall(req, res) {
  try {
    const data = await joueur.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getallPartie(req, res) {
  try {
    const data = await partie.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await joueur.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function deleteJoueur(req, res) {
  try {
    const data = await joueur.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function attaque(req, res) {
  try {
    const j1 = await joueur.findById(req.params.id1);
    const j2 = await joueur.findById(req.params.id2);
    score1 = j1.score + 10;
    sante2 = j2.sante - 20;
    console.log("score 1: " + score1 + "sante2: " + sante2);
    const j1u = await joueur.findByIdAndUpdate(req.params.id1, {
      score: score1,
    });
    const j2u = await joueur.findByIdAndUpdate(req.params.id2, {
      sante: sante2,
    });

    res.send(j1u + j2u);
  } catch (err) {
    res.send(err);
  }
}
$$JCS22-23**

async function attaqueSocket(data) {
  try {
    const j1 = await joueur.findById(data.id1);
    const j2 = await joueur.findById(data.id2);
    score1 = j1.score + 10;
    sante2 = j2.sante - 20;
    console.log("score 1: " + score1 + "sante2: " + sante2);
    const j1u = await joueur.findByIdAndUpdate(data.id1, {
      score: score1,
    });
    const j2u = await joueur.findByIdAndUpdate(data.id2, {
      score: sante2,
    });

    res.send(j1u + j2u);
  } catch (err) {
    res.send(err);
  }
}

async function afficherSocket(data) {
  try {
    console.log(data.id1);
    const j1 = await joueur.findById(data.id1);
    const j2 = await joueur.findById(data.id2);
    r = { j1: j1, j2: j2 };
    //console.log("afficherSocket");
    //console.log(r);
    return r;
  } catch (err) {
    res.send(err);
  }
}

async function add(req, res) {
  try {
    const Joueur = new joueur({
      pseudo: req.body.pseudo,
      sante: 100,
      score: 0,
    });

    await Joueur.save();
    console.log("add success");
    res.status(200).send("Le joueur a été ajouté avec succès :" + Joueur.pseudo);
  } catch (err) {
    console.log({ error: error.toString() });
  }
}

async function addPartie(req, res) {
  try {
    const Partie = new partie({
      nom: req.body.nom,
      joueur1: req.params.id1,
      joueur2: req.params.id2,
      etat: "en cours",
      gagnant: "",
    });

    await Partie.save();
    console.log("add success");
  } catch (err) {
    console.log({ error: error.toString() });
  }
}

async function addPartieSocket(data) {
  try {
    const Partie = new partie({
      nom: data.nom,
      joueur1: data.id1,
      joueur2: data.id2,
      etat: "en cours",
      gagnant: "",
    });

    const j1u = await joueur.findByIdAndUpdate(data.id1, {
      sante: 100,
    });
    const j2u = await joueur.findByIdAndUpdate(data.id2, {
      sante: 100,
    });
    await Partie.save();
    console.log("add success");
  } catch (err) {
    console.log({ error: error.toString() });
  }
}

module.exports = {
  getall,
  getbyid,
  add,
  attaque,
  attaqueSocket,
  addPartie,
  getallPartie,
  addPartieSocket,
  afficherSocket,
  deleteJoueur,
};
