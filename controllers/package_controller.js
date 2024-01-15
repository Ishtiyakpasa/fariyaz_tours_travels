const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// async function getAllPackage(req, res) {
//     try {
//       // const packages = await prisma.packages.findMany() || [];
//       // console.log(packages);
//       // res.render('admin/package_management', { packages });
//       // res.render('admin/package_management');
//     } catch (error) {
//       console.error('Error fetching Packages:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
  
async function getAllPackageData(req, res) {
  try {
    const packages = await prisma.packages.findMany();

    // Format the data for DataTables
    const dataTableFormat = {
      data: packages,           // Array of your package data
      recordsTotal: packages.length,   // Total number of records in the dataset
      recordsFiltered: packages.length, // Total number of records after filtering (if applicable)
      draw: null                // Optional draw parameter (set to null in this example)
    };

    res.json(dataTableFormat);
  } catch (error) {
    console.error('Error fetching Packages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  async function createPackage(req, res) {
    console.log('req body---->', req.body);
    const { name, description, days, departure_city, small_thumb, large_thumb, gallary_image, departure_date, arrival_date, adult_price, child_price, hotel_distence, hotel, package_category} = req.body;
  
    try {
      const newPackage = await prisma.packages.create({
        data: {
          name,
          description,
          days: parseInt(days, 10),
          departure_city,
          small_thumb,
          large_thumb,
          gallary_image,
          departure_date: new Date(departure_date).toISOString(),
          arrival_date: new Date(arrival_date).toISOString(),
          adult_price: parseFloat(adult_price),
          child_price: parseFloat(child_price),
          hotel_distence: parseInt(days, 10),
          hotel,
          package_category
        },
      });
      res.redirect("/admin/package_management")
    } catch (error) {
      console.error('Error creating Package:', error);
      res.status(500).json({ msg: 'Internal Server Error', error: error});
    }
  }

  async function updatePackage(req, res) {
    const userId = parseInt(req.params.id, 10);
    const {name, description, days, departure_city, small_thumb, large_thumb, gallary_image, departure_date, arrival_date, adult_price, child_price, hotel_distence, hotel} = req.body;
  
    try {
      const updatedpackages = await prisma.packages.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
          days,
          departure_city,
          small_thumb,
          large_thumb,
          gallary_image,
          departure_date,
          arrival_date,
          adult_price,
          child_price,
          hotel_distence,
          hotel
        },
      });
  
      res.redirect('/package_management'); // Redirect to the user list page
    } catch (error) {
      console.error('Error updating package:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    // getAllPackage,
    getAllPackageData,
    createPackage,
    updatePackage,
  };