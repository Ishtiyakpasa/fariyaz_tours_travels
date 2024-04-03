const express = require('express')
const router = express.Router()
const hajjController = require('../controllers/hajj_controller');
const umrahController = require('../controllers/umrah_controller');
const Message = require('../controllers/contact_controller');
const package_controller = require('../controllers/package_controller');
const info_controller = require('../controllers/info_controller');
const authMiddleware = require('../middlewares/auth_middlewares')
const home_conteoller = require('../controllers/home_controller');
const booking_controller= require('../controllers/booking_controller');
const register_controller= require('../controllers/register_controller');
const upload= require('../middlewares/booking_multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', function (req, res) {
    console.log('this',req.session.user)
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/home', { isLoggedIn: isLoggedIn })
})
  
router.get('/hajj', function (req, res){
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/hajj', { isLoggedIn: isLoggedIn })
})
router.get('/umrah', function (req, res){
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/umrah', { isLoggedIn: isLoggedIn })
})
router.get('/contact_us', function (req, res){
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/contact_us', { isLoggedIn: isLoggedIn })
})

router.get('/book_package/:id', authMiddleware.requireUserAuth,(req, res)=>{
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/book_package', { isLoggedIn: isLoggedIn })
})

router.get('/package_info/:id', function(req, res){
    const isLoggedIn = req.session.user ? true : false;
    res.render('user/package_info', { isLoggedIn: isLoggedIn })
})

router.get('/payment/:id', function(req,res){
    res.render('user/payment')
})

router.get('/thank_u', function(req,res){
    res.render('user/thank_u')
})

router.get('/register', function(req,res){
    res.render('user/register')
})

router.get('/user_login', function(req,res){
    res.render('user/login')
})

// Route to check email uniqueness
router.post('/check_email', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase() // Convert email to lowercase for case-insensitive comparison
            }
        });

        // If no user found with the provided email, it's unique
        if (!existingUser) {
            res.json({ unique: true });
        } else {
            res.json({ unique: false });
        }
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.post('/submit-form', (req, res) => {
//     // Handle form submission logic here
//     res.send('Form submitted successfully'); // Example response
//   });
  

// <!-- controller route -->
router.get('/packages/hajj', hajjController. getHajjPackages);
router.get('/packages/umrah', umrahController. getUmrahPackages);
router.get('/packages', home_conteoller.getAllPackages);
router.post('/contact', Message.createMessage)


// booking controller route
router.get('/get_package/:id', package_controller.getPackage); //for getting package name on booking form
router.get('/get_info/:id', info_controller.getDetailinfo);

//booking controller
router.post('/booking_controller',upload.fields([
    { name: 'passport_upload', maxCount: 1 }, // For single file upload
    { name: 'adhar_upload', maxCount: 1 }      // For single file upload
  ]), booking_controller.createBooking);
  router.get('/displayBookingDetails/:id', booking_controller.displayBookingDetails);

//login and register controller
router.post('/create_user', register_controller.createUser);
router.post('/user_login', register_controller.login);
router.get('/logout', register_controller.logout);

module.exports=router