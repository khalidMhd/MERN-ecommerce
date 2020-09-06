const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const userModel = require('../models/user')

router.get('/profile',loginRequire,(req,res,next)=>{
    userModel.findOne({_id:req.user._id})
    .then(user=>{
        console.log(user);
            res.status(200).json({result:user})
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router