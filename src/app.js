require("dotenv").config({});
const path = require("path");
const PORT = process.env.PORT;
const express = require("express");
const app = express();

app.use((req, res, next) => {
  if (req.path.endsWith("/") && req.path.length > 1) {
    const newPath = req.path.slice(0, -1);
    const query = req.url.slice(req.path.length);
    res.redirect(301, newPath + query);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("SERVER IS ON!");
});
