const express = require('express')
const router = express.Router()
const package_controller = require('../controllers/package_controller')
const authMiddleware = require('../middlewares/auth_middlewares')
const login_controller = require('../controllers/login_controller')
const booking_controller = require('../controllers/booking_controller')
const info_controller = require('../controllers/info_controller')
const upload = require('../middlewares/multerconfig');
const contact_controller = require('../controllers/contact_controller')

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

//route for image upload
router.post('/upload', upload.single('thumbnail'), (req, res) => {
    // Now req.file should contain the uploaded file
    console.log(req.file);
  });

//dashboard controller
router.get('/dashboard/total', info_controller.getStatistics)

//route for contact
router.get('/message/data', contact_controller.getAllContactData);
router.delete('/message/delete_message/:id', contact_controller.deleteMessage);

//routes for package_management
router.post('/package_management/add_package', upload.single('thumbnail'), package_controller.createPackage);
router.get('/package_management/data', package_controller.getAllPackageData);
router.get('/package_management/get_package/:id', package_controller.getPackage);
router.post('/package_management/edit_package/:id', package_controller.updatePackage);
router.delete('/delete_package/:id', package_controller.deletePackage);

//routes for booking
router.get('/getbookings', booking_controller.getAllbookings);
router.delete('/delete_booking/:id', booking_controller.deleteBooking);
module.exports=router