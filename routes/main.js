const router = require('express').Router();

router.get("/",(req,res,next)=>{
    res.render("main/landing page");
});

module.exports = router;