/********************************************************************************* * 
 * WEB422 – Assignment 1 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. * 
 * No part of this assignment has been copied manually or electronically from any other source *
 *  (including web sites) or distributed to other students. * 
 * 
 *  Name: saeed zakeri  Student ID: 111339214
   Date: 09/16/2022 * 
 * Cyclic Link: 
 * 
 * ********************************************************************************/

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: process.env.MESSAGE });
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/api/movies", (req, res) => {
  db.addNewMovie(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.get("/api/movies", (req, res) => {
  db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
app.get("/api/movies/:id", (req, res) => {
  db.getMovieById(req.params.id)
    .then((data) => {
      if (data == null) res.status(404).json({ message: "not found" });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
app.put("/api/movies/:id", (req, res) => {
  db.updateMovieById(req.body, req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.delete("/api/movies/:id", (req, res) => {
  db.deleteMovieById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
