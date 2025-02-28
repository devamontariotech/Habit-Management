require("dotenv").config();
const appPath = process.env.APP_PATH ? path.normalize(process.env.APP_PATH) : "./src";
console.log("App Path : ",appPath);