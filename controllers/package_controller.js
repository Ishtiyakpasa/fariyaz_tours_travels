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
      data: packages,           // Array of package data
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
  // console.log('req body---->', req.body);
  const { name, description, days, departure_city , gallary_image, departure_date, arrival_date, adult_price, child_price, hotel_distence, hotel, baggage, meal, package_category } = req.body;
  // console.log(req.files);
  const thumbnail = req.file ? req.file.filename : null;

  const existingPackage = await prisma.packages.findUnique({
    where: {
      name: name // Check if a package with the same name already exists
    }
  });

  if (existingPackage) {
    return res.status(400).json({ error: 'A package with the same name already exists.' });
  }


  try {
    const newPackage = await prisma.packages.create({
      data: {
        name,
        description,
        days: parseInt(days, 10),
        departure_city,
        thumbnail,
        gallary_image,
        departure_date: new Date(departure_date).toISOString(),
        arrival_date: new Date(arrival_date).toISOString(),
        adult_price: parseFloat(adult_price),
        child_price: parseFloat(child_price),
        hotel_distence: parseInt(days, 10),
        hotel,
        baggage,
        meal,
        package_category
      },
    });
    res.redirect("/admin/package_management");
  } catch (error) {
    console.error('Error creating Package:', error);
    res.status(500).json({ msg: 'Internal Server Error', error: error });
  }
}

async function getPackage(req, res){
  const packageId = parseInt(req.params.id, 10);

    try {
      const packageDetails = await prisma.packages.findFirst({
        where: { id: packageId },
      });
      
      res.json(packageDetails);
      console.log('packageDetails', packageDetails)
    } catch (error) {
      console.error('Error fetching package details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updatePackage(req, res) {
  console.log(req.body);
  const id = parseInt(req.params.id, 10);
  const {
    name,
    description,
    days,
    departure_city,
    thumbnail,
    gallary_image,
    departure_date,
    arrival_date,
    adult_price,
    child_price,
    hotel_distence,
    hotel,
    baggage,
    meal,
    package_category
  } = req.body;

  try {
    const parsedDepartureDate = departure_date ? new Date(departure_date).toISOString() : null;
    const parsedArrivalDate = arrival_date ? new Date(arrival_date).toISOString() : null;

    
    console.log('Parsed id:', id);
    console.log('Parsed departure_city:', departure_city);
    const updatedPackage = await prisma.packages.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        days: parseInt(days, 10),
        departure_city,
        thumbnail,
        gallary_image,
        departure_date: parsedDepartureDate,
        arrival_date: parsedArrivalDate,
        adult_price: parseFloat(adult_price),
        child_price: parseFloat(child_price),
        hotel_distence: parseInt(days, 10),
        hotel,
        baggage,
        meal,
        package_category
      },
    });  
    res.json({success:true, message: 'Package Updated successfully'});
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deletePackage(req, res) {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedPackage = await prisma.packages.delete({
      where: { id: id },
    });

    res.json({success:true, message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  // getAllPackage,
  getAllPackageData,
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
};