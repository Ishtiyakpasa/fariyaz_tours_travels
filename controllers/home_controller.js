const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllPackages(req, res) {
    try {
        const packages = await prisma.packages.findMany(); // Fetch all packages

        res.json(packages); // Send the packages as JSON response
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllPackages
};
