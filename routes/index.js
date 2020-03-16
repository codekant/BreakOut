const express = require("express");
const app = express.Router();
const client = require("../index").bot;

app.get("/", (req, res) => {
  res.render("index", {
    client: client,
    user: req.session.user || null,
    title: "BreakOut"
  })
});

module.exports = app;
