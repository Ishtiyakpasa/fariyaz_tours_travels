const express = require('express')
const router = express.Router()
const packagesController = require('../controllers/hajj_controller');

router.get('/', function (req, res) {
    res.render('user/home')
})
  
router.get('/hajj', function (req, res){
    res.render('user/hajj')
})
router.get('/umrah', function (req, res){
    res.render('user/umrah')
})
router.get('/contact_us', function (req, res){
    res.render('user/contact_us')
})

// <!-- controller routeer -->
router.get('/packages/hajj', packagesController. getHajjPackages);

module.exports=router