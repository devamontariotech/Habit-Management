import open from 'open';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
import cors from 'cors';
dotenv.config();
const router = express.Router();
fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname,"frontend","pages");
const staticPath = process.env.STATIC_PATH ? path.resolve(process.env.STATIC_PATH) : path.join(__dirname,"css");
const mongoURI = "mongodb://shah:shah@localhost:27017/habitude_1?authSource=admin";

const client = new MongoClient(mongoURI);

console.log("App Path : ",appPath);
console.log("Static Path : ",staticPath);
app.use(express.static(appPath));
app.use('/css',express.static(staticPath));
app.use(cors());
app.use(express.static(__dirname,{
  extensions:["webp","jpg","svg"],
}));
app.get("/", (req,res) => {
  const pageName = req.params.pageName;
  const pagePath = path.resolve(appPath,"${pageName}.html");

  // console.log("Found Path!")
  res.redirect("frontend/pages/homepage.html");
  // res.status(200).sendFile(pagePath, (error) => {
  //   if(error){
  //     console.error(`Error reading or sending ${pageName}.html:`, error);
  //     res.status(404).send(`Page ${pageName} not found.`);
  //   }
  // });
});
app.get("*", (req, res) => {
  return res.sendStatus(404);
});

app.listen(3000, async () => {
  console.log('Running on http://localhost:3000')
  await open('http://localhost:3000',{app:{name:"/usr/bin/firefox-esr"}});
});

async function connectDB() {
  try{
    await client.connect();
    console.log("Connected to mongoDB!");
  }
  catch(error){
    console.error("Connection failed: ",error);
  }
}
connectDB();

app.post("/shutdown",async (req,res) => {
  console.log("Server is shut down!")
  res.send("Server will now shut down!");
  process.exit(0);
});