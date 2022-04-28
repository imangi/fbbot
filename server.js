const express = require("express");
const viewEngine = require("./src/config/viewEngine");
const initWebRoutes = require("./src/routes/web");
const dotenv = require("dotenv");
dotenv.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine

viewEngine(app);

//initWebRoutes

initWebRoutes(app);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`messenger bot is running at port ${PORT}`);
});
