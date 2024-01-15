const express = require('express')
const router = express.Router()
const package_controller = require('../controllers/package_controller')


//pages routing
router.get('/',(req,res)=>{
    res.render('admin/dashboard')
})

router.get('/booking_management',(req,res)=>{
    res.render('admin/booking_management')
})

router.get('/package_management',(req,res,next)=>{
    res.render('admin/package_management')
})

router.get('/payment_management',(req,res,next)=>{
    res.render('admin/payment_management')
})

router.get('/message',(req,res)=>{
    res.render('admin/message')
})

router.get('/package_management/add_package',(req,res)=>{
    res.render('admin/add_package')
})

router.get('/package_management/edit_package',(req,res)=>{
    res.render('admin/edit_package')
})

//routs for package_management
// router.get('/admin/package_management', package_controller.getAllPackage);
router.get('/package_management/data', package_controller.getAllPackageData);
router.post('/package_management/add_package', package_controller.createPackage);
router.put('/package_management/edit_package', package_controller.updatePackage);


module.exports=router