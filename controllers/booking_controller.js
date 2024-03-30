const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createBooking(req, res) {
  try {
    const { customer_name, email, adult_count, child_count, contact, state, city, user_id} = req.body;

    const passport_upload = req.file ? req.file.filename : null;
    const adhar_upload = req.file ? req.file.filename : null;

    // Parse the package_id to an integer
    const package_name = req.body.name;

    console.log('Package Name:', package_name);

    // Fetch package details including adult_price and child_price
    const packageDetails = await prisma.packages.findUnique({
      where: {
        name: package_name // Provide the parsed package_id as the value for the id argument
      }
    });

    // Check if packageDetails is null
    if (!packageDetails) {
      return res.status(404).json({ msg: 'Package not found' });
    }

    // Calculate total_price based on adult_count, child_count, and package prices
    const total_price = (adult_count * packageDetails.adult_price) + (child_count * packageDetails.child_price);

    // Create new booking record
    const newBooking = await prisma.bookings.create({
      data: {
        customer_name,
        email,
        adult_count: parseInt(adult_count, 10),
        child_count: parseInt(child_count, 10),
        contact,
        total_price,
        state,
        city,
        // user_id: user_id || 0,
        package_id: packageDetails.id || null,
        passport_upload,
        adhar_upload,
      },
    });

    res.json(newBooking); 
    // res.redirect("/user");

  } catch (error) {
    console.error('Error creating booking:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    res.status(500).json({ msg: 'Internal Server Error', error: errorMessage });
  }
}


async function getAllbookings(req, res) {
  try {
    const bookings = await prisma.bookings.findMany();

    // Format the data for DataTables
    const dataTableFormat = {
      data: bookings,           // Array of package data
      recordsTotal: bookings.length,   // Total number of records in the dataset
      recordsFiltered: bookings.length, // Total number of records after filtering (if applicable)
      draw: null                // Optional draw parameter (set to null in this example)
    };

    res.json(dataTableFormat);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteBooking(req, res) {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedBooking = await prisma.bookings.delete({
      where: { id: id },
    });

    res.json({success:true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting Booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function displayBookingDetails(req, res) {
  try {
    // Fetch booking details along with associated package details
    const id = parseInt(req.params.id); // Assuming bookingId is passed as a request parameter and converting it to a number
    console.log(id)
    const bookingDetails = await prisma.bookings.findUnique({
      where: {
        id: id // Use the parsed bookingId as the value for the id argument
      },
      include: {
        packages: true // Include related package details
      }
    });

    // Check if bookingDetails exist
    if (!bookingDetails) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Render the page with the retrieved data
    // res.render('bookingDetails', { bookingDetails });
    console.log(bookingDetails)
    res.json(bookingDetails)
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}



  module.exports ={
    createBooking,
    getAllbookings,
    deleteBooking,
    displayBookingDetails
  }