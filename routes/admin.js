const express = require('express')
const router = express.Router()
const package_controller = require('../controllers/package_controller')
const authMiddleware = require('../middlewares/auth_middlewares')
const login_controller = require('../controllers/login_controller')


//pages routing
router.get('/', authMiddleware.requireAdminAuth,(req,res)=>{
    res.render('admin/dashboard')
}),

router.get('/login',(req, res)=>{
    res.render('admin/auth/login')
}),

router.get('/booking_management',authMiddleware.requireAdminAuth,(req,res)=>{
    res.render('admin/booking_management')
}),

router.get('/package_management',(req,res,next)=>{
    res.render('admin/package_management')
}),

router.get('/payment_management',authMiddleware.requireAdminAuth,(req,res,next)=>{
    res.render('admin/payment_management')
})

router.get('/message',authMiddleware.requireAdminAuth,(req,res)=>{
    res.render('admin/message')
}),

router.get('/package_management/add_package',authMiddleware.requireAdminAuth,(req,res)=>{
    res.render('admin/add_package')
}),

router.get('/package_management/edit_package/:id',authMiddleware.requireAdminAuth,(req,res)=>{
    res.render('admin/edit_package')
}),

//route for login page
router.post('/login/data', login_controller.loginAdmin);
router.get('/login/out', login_controller.logoutAdmin);


//routes for package_management
router.get('/package_management/data', package_controller.getAllPackageData);
router.post('/package_management/add_package', package_controller.createPackage);
router.get('/package_management/get_package/:id', package_controller.getPackage);
router.post('/package_management/edit_package/:id', package_controller.updatePackage);
router.delete('/package_management/delete_package/:id', package_controller.deletePackage);



module.exports=router