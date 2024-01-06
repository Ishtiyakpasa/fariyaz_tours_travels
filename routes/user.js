const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.render('user/home')
})
  
router.get('/hajj', function (req, res){
    res.render('user/hajj')
})
router.get('/ummrah', function (req, res){
    res.render('user/ummrah')
})
router.get('/contact_us', function (req, res){
    res.render('user/contact_us')
})

module.exports=router