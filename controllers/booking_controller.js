const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createBooking(req, res) {
    // console.log('req body---->', req.body);
    const { name, email, adult_count, child_count, contact, total_price, state, city, package_id, user_id,} = req.body;
    // console.log(req.files);
    // const thumbnail = req.file ? req.file.filename : null;
  
    const bookings = await prisma.bookings.findUnique({
      where: {
        name: name // Check if a package with the same name already exists
      }
    });
  
    if (bookings) {
      return res.status(400).json({ error: 'A package with the same name already exists.' });
    }
    try {
      const bookings = await prisma.bookings.create({
        data: {
          name,
          email,
          adult_count: parseInt(days, 10),
          child_count: parseInt(days, 10),
          contact,
          total_price,
          state,
          city,
          user_id,
          package_id,
          passport_upload,
          adhar_upload,
        },
      });
      res.redirect("/user");
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ msg: 'Internal Server Error', error: error });
    }
  }


  module.exports ={
    createBooking
  }