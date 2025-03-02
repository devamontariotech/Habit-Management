import open from 'open';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
dotenv.config({path:path.resolve("../.env")});
console.log("dotenv config result : ",dotenv.config());
const router = express.Router();
// fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname,"src");
const staticPath = process.env.STATIC_PATH ? path.resolve(process.env.STATIC_PATH) : path.join(__dirname,"css");
// const mongoURI = process.env.MONGODB_URI ? path.resolve(process.env.MONGODB_URI) : "mongodb://localhost:3000/";
const defaultPagePath = process.env.DEFAULT_PAGE;
const defaultPageName = defaultPagePath ? path.basename(defaultPagePath, path.extname(defaultPagePath)) : "homepage";
console.log("App Path : ",appPath);
console.log("Static Path : ",staticPath);
console.log("Default Page Name : ",defaultPageName);
if(!appPath){
  console.error("APP_PATH is not defined in .env");
}
if(!staticPath){
  console.error("STATIC_PATH is not defined in .env");
}
app.use(express.static(appPath));
app.use('/css',express.static(staticPath));
app.get("/", (req,res) => {
  /*const pageName = defaultPageName;
  const pagePath = path.join(appPath,"frontend","pages",`${pageName}.html`);
  console.log(`Serving ${pageName}.html from ${pagePath}`);
  fs.readFile(pagePath, (error,content) => {
    if(error){
      console.error(`Error reading or sending ${pageName}.html:`, error);
      res.status(404).send(`Page ${pageName} not found.`);
    }
    else{
      res.status(200).setHeader('Content-Type','text/html').send(content);
    }
  });*/
  const filePath = path.join(appPath,"frontend","pages","homepage.html");
  res.sendFile(filePath, (err)=>{
    if(err){
      console.error(err);
      res.status(500).send("Internal Server Error!");
    }
  })
//  res.redirect("/homepage.html");
});

app.listen(3000, async () => {
  console.log('Running on http://localhost:3000');
  try{
    await open('http://localhost:3000',{app:{name:"/usr/bin/google-chrome"}});
  }
  catch(error){
    console.log("Error opening browser : ",error);
  }
});

app.post("/shutdown",async (req,res) => {
  console.log("Server is shut down!");
  res.status(403).send("Shutdown is disabled!");
});