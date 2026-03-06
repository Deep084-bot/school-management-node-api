const express = require("express");
const router = express.Router();
const db = require("../db");

// Add School
router.post("/addSchool", (req, res) => {

 const {name,address,latitude,longitude} = req.body;

 if(!name || !address || !latitude || !longitude){
   return res.status(400).json({error:"All fields required"});
 }

 const query = "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

 db.query(query,[name,address,latitude,longitude],(err,result)=>{
   if(err) return res.status(500).json(err);

   res.json({message:"School added successfully"});
 });

});


// List Schools sorted by distance
router.get("/listSchools",(req,res)=>{

 const userLat = parseFloat(req.query.latitude);
 const userLon = parseFloat(req.query.longitude);

 const query = "SELECT * FROM schools";

 db.query(query,(err,results)=>{
   if(err) return res.status(500).json(err);

   const schools = results.map(school=>{

     const distance = Math.sqrt(
      Math.pow(school.latitude-userLat,2) +
      Math.pow(school.longitude-userLon,2)
     );

     return {...school,distance};

   });

   schools.sort((a,b)=>a.distance-b.distance);

   res.json(schools);

 });

});

module.exports = router;