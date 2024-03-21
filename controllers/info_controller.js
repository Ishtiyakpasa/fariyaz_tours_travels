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

module.exports ={
    getDetailinfo
}
