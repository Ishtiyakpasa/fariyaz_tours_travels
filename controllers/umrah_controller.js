const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUmrahPackages(req, res) {
    try {
        const umrahPackages = await prisma.packages.findMany({
            where: {
                package_category: {
                    contains: 'umrah', // Case-insensitive search for 'hajj'
                    mode: 'insensitive' // Make the search case-insensitive
                }
            }
        });
        
        res.json(umrahPackages);
        console.log(umrahPackages);
    } catch (error) {
        console.error('Error fetching hajj packages:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
module.exports = {
    getUmrahPackages
};