const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getHajjPackages(req, res) {
    try {
        const hajjPackages = await prisma.packages.findMany({
            where: {
                package_category: {
                    contains: 'hajj', // Case-insensitive search for 'hajj'
                    mode: 'insensitive' // Make the search case-insensitive
                }
            }
        });
        
        res.json(hajjPackages);
        console.log(hajjPackages);
    } catch (error) {
        console.error('Error fetching hajj packages:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
module.exports = {
    getHajjPackages
};