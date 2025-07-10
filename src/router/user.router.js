const express = require("express");

const router = express.Router();


// router.post("/login")
// router.post("/signup")
// router.post("/me")
router.get("/check",(req,res)=>{
    console.log("check sucess")
    res.send("check sucess")
})



module.exports = router;
