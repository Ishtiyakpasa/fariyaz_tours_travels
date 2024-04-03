const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const { fname, lname, email, password } = req.body;

  // Hash password
  console.log('Request Body:', req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user
    const user = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        password: hashedPassword,
      }
    });

    // console.log(user)
    res.status(201).json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Password is correct, user is authenticated
      req.session.user = {
        id:user.id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
      };
      res.status(200).json({ success: true, message: 'Login successful', user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: true, error: 'Internal Server Error' });
    }
  }

  async function logout(req, res) {
    // console.log("Before session destruction", req.session);  
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            res.redirect('/user/user_login');
        }
    });
  }

module.exports={
    createUser,
    login,
    logout
}

