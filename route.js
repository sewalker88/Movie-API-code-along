"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "2001: A Space Odessey", year: 1968, animated: false },
  { id: 2, title: "The Godfather", year: 1972, animated: false },
  { id: 3, title: "The Lion King", year: 1994, animated: false },
  { id: 4, title: "Black Panther", year: 2018, animated: false },
];

let nextId = 5;

//Get /movies-respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`no movie with id ${id} exists.`);
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});

// export routes for use in server.js
module.exports = routes;

//kept getting error when runninhg nodemon see below

//sewal@DESKTOP-S46B9J4 MINGW64 ~/Desktop/Movie-api
//$ nodemon
// [nodemon] 2.0.4
// [nodemon] to restart at any time, enter `rs`
// [nodemon] watching path(s): *.*
// [nodemon] watching extensions: js,mjs,json
// [nodemon] starting `node server.js`
// internal/modules/cjs/loader.js:969
//   throw err;
//   ^

// Error: Cannot find module './routes'
// Require stack:
// - C:\Users\sewal\Desktop\Movie-api\server.js
//     at Function.Module._resolveFilename (internal/modules/cjs/loader.js:966:15)
//     at Function.Module._load (internal/modules/cjs/loader.js:842:27)
//     at Module.require (internal/modules/cjs/loader.js:1026:19)
//     at require (internal/modules/cjs/helpers.js:72:18)
//     at Object.<anonymous> (C:\Users\sewal\Desktop\Movie-api\server.js:7:16)
//     at Module._compile (internal/modules/cjs/loader.js:1138:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
//     at Module.load (internal/modules/cjs/loader.js:986:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:879:14)
//     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12) {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: [ 'C:\\Users\\sewal\\Desktop\\Movie-api\\server.js' ]
// }
// [nodemon] app crashed - waiting for file changes before starting...
