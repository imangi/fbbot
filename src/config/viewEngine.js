const express = require("express");
const path = require("path");

//config view engine

let configViewEngine = (app) => {
  app.set("viewEngine", "html");
  app.set("views", "src/views");
};

module.exports = configViewEngine;
