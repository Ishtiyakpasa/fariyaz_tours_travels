const express = require('express')
const router = express.Router()
const hajjController = require('../controllers/hajj_controller');
const umrahController = require('../controllers/umrah_controller');
const Message = require('../controllers/contact_controller');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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

router.get('/book_package', function(req, res){
    res.render('user/book_package')
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
  

// <!-- controller routeer -->
router.get('/packages/hajj', hajjController. getHajjPackages);
router.get('/packages/umrah', umrahController. getUmrahPackages);
router.post('/contact', Message.createMessage)


module.exports=router