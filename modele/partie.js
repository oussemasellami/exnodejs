const mongo = require("mongoose");
const Schema = mongo.Schema;
const Partie = new Schema({
  nom: String,
  joueur1: String,
  joueur2: String,
  etat: String,
  gagnant: String,
});

module.exports = mongo.model("partie", Partie);
