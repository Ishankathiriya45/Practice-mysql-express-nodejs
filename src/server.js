require("dotenv").config();
const express = require("express");
const { db } = require("./db/models");
const clc = require("cli-color");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes"));

const port = process.env["PORT_" + process.env.RUN_MODE];
app.listen(port, () => {
  console.log(
    `Server is running on port ${clc.yellow.underline(
      port
    )} in ${clc.yellow.underline("LOCAL")} environment`
  );
});
