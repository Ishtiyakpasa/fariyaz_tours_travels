const express = require('express')
const router = express.Router()



router.get('/',(req,res)=>{
    res.render('admin/dashboard')
})

router.get('/booking_management',(req,res)=>{
    res.render('admin/booking_management')
})

router.get('/package_management',(req,res,next)=>{
    res.render('admin/package_management', { title: 'Foo Tables', page_title: 'Foo Tables', sub_title: 'Tables' })
})

router.get('/payment_management',(req,res)=>{
    res.render('admin/payment_management')
})

router.get('/notification',(req,res)=>{
    res.render('admin/notification')
})

module.exports=router