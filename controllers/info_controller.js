const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getDetailinfo(req, res) {
    try {
        const { id } = req.params; // Assuming the ID is passed as a request parameter
        const package = await prisma.packages.findUnique({
            where: {
                id: parseInt(id) // Convert the ID to a number if it's a string
            }
        });
        
        if (package) {
            res.json(package);
            console.log(package);
        } else {
            res.status(404).json({ success: false, message: 'Package not found' });
        }
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

//total of all tables
async function getStatistics(req, res) {
    try {
        // Fetch total number of customers
        const totalCustomers = await prisma.bookings.count();

        // Fetch total number of packages
        const totalPackages = await prisma.packages.count();

        // Fetch total number of messages
        const totalMessages = await prisma.contact_us.count();

        // Send statistics as JSON response
        // console.log('Total customers:', totalCustomers);
        // console.log('Total packages:', totalPackages);
        // console.log('Total messages:', totalMessages);
        res.status(200).json({ totalCustomers, totalPackages, totalMessages });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        // Send error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports ={
    getDetailinfo,
    getStatistics
}
