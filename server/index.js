const fs = require("fs");
const Joi = require("joi");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
 
const characters = require("./characters.json");
 
app.get("/", (req, res) => {
  res.send("<h1>Úvodní stránka - REST API</h1>");
});
 
app.get("/api/characters", (req, res) => {
  res.send(characters);
});
 
app.get("/api/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const character = characters.find(character => character.id === id);
  if (character) {
    res.send(character);
  } else {
    res.status(404).send("Soubor nebyl nalezen.");
  }
});
 
app.post("/api/characters", (req, res) => {
  const { error } = validatecharacter(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const character = {
      id: characters.length !== 0 ? characters[characters.length - 1].id + 1 : 1,
      name: req.body.name,
      surname: req.body.surname,
      character: req.body.character,
      year: req.body.year,
      content: req.body.content,
    };
    characters.push(character);
    res.send(character);
    writeJSON(characters, "characters.json");
  }
});
 
app.put("/api/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const character = characters.find(character => character.id === id);
  if (!character) {
    res.status(404).send("Soubor nebyl nalezen.");
    return;
  }
  const { error } = validatecharacter(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    character.name = req.body.name;
    character.surname = req.body.surname;
    character.character = req.body.character;
    character.year = req.body.year;
    character.content = req.body.content;
    res.send(character);
    writeJSON(characters, "characters.json");
  }
});
 
app.delete("/api/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const character = characters.find(character => character.id === id);
  if (!character) {
    res.status(404).send("Charakter nebyl nalezen.");
  } else {
    const index = characters.indexOf(character);
    characters.splice(index, 1);
    res.send(character);
    writeJSON(characters, "characters.json");
  }
});
 
app.listen(3000, () => console.log("Listening on port 3000..."));
 
function validatecharacter(character) {
  const schema = {
    name: Joi.string()
      .min(2)
      .required(),
    surname: Joi.string(),
    character: Joi.string(),
    year: Joi.number(),
    state: Joi.string(),
    content: Joi.string()
  };
  return Joi.validate(character, schema);
}
 
function writeJSON(jsonData, pathToFile) {
  let data = JSON.stringify(jsonData, null, 2);
  fs.writeFile(pathToFile, data, err => {
    if (err) {
      throw err;
    } else {
      console.log("Data written to file");
    }
  });
}