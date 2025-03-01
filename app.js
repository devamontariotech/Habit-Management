require("dotenv").config();
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const app = express();
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname,"src");

app.use(express.static(appPath));
app.get("",(req,res) => {
  res.sendFile(path.join(appPath,"/frontend/pages/homepage.html"));
})

app.listen(3000, () => console.log('Running on http://localhost:3000'));