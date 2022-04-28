const express = require("express");
const path = require("path");

//config view engine

let configViewEngine = (app) => {
  app.use(express.static("../public"));
  app.use("/cssFiles", express.static(path.join(__dirname, "../public/css")));
  app.use("/jsFiles", express.static(path.join(__dirname, "../public/js")));
  app.set("viewEngine", "ejs");
  app.set("views", "src/views");
};

module.exports = configViewEngine;
