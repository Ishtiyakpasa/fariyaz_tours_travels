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
      console.error('Error creating Package:', error);
      res.status(500).json({ msg: 'Internal Server Error', error: error });
    }
  }

  module.exports = {
    createMessage
  }