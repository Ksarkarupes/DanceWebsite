const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("academy"));
app.get("/classes", (req, res) => res.render("programs"));
app.get("/services", (req, res) => res.render("studio"));
app.get("/contact", (req, res) => res.render("contact"));

app.post("/contact", (req, res) => {
  res.send("Form submitted");
});

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}
