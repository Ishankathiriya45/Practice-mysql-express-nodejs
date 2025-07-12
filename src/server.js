require("dotenv").config();
const express = require("express");
const { db } = require("./db/models");
const clc = require("cli-color");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api", require("./routes"));

module.exports = app;
