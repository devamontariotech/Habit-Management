const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const app = express();

app.get('/', (req, res) => {
  res.send('Habit Tracking App');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));