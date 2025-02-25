const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

router.get('/frontend/pages/:webpage', async (req,res) => {
    const webpage = req.params.webpage;
    const filedir = path.join(__dirname,'..','frontend','pages','${webpage}.html');
    try{
        const pageContent = await fs.readFile(filedir,'utf8');
        res.status(200).send(pageContent);
    }
    catch(error){
        console.error("Error loading webpage",error);
        res.status(404).send("Page ${webpage} is not found!");
    }
});
module.exports = router;