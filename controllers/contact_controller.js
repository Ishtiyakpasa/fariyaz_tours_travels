const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMessage(req, res) {
    const { name, email, message, city,} = req.body;
    try {
      const newMessage = await prisma.contact_us.create({
        data: {
          name,
          email,
          message,
          city
        },
      });
      res.redirect("/user/contact_us");
    } catch (error) {
      console.error('Error creating contact_us:', error);
      res.status(500).json({ msg: 'Internal Server Error', error: error });
    }
  }

  async function getAllContactData(req, res) {
    try {
      const contact_us = await prisma.contact_us.findMany();
  
      // Format the data for DataTables
      const dataTableFormat = {
        data: contact_us,           // Array of package data
        recordsTotal: contact_us.length,   // Total number of records in the dataset
        recordsFiltered: contact_us.length, // Total number of records after filtering (if applicable)
        draw: null                // Optional draw parameter (set to null in this example)
      };
  
      res.json(dataTableFormat);
    } catch (error) {
      console.error('Error fetching contact_us:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function deleteMessage(req, res) {
    const id = parseInt(req.params.id, 10);
  
    try {
      const contact_us = await prisma.contact_us.delete({
        where: { id: id },
      });
  
      res.json({success:true, message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports = {
    createMessage,
    getAllContactData,
    deleteMessage
  }

