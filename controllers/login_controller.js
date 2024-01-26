async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    // Perform actual authentication logic here, for now using hardcoded values
    if (email === 'istiyakpasa130@gmail.com' && password === '12345') {
      req.session.admin = { email: 'istiyakpasa130@gmail.com' };
      // req.session.user = { email: 'istiyakpasa130@gmail.com' };
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

async function logoutAdmin(req, res) {
  // console.log("Before session destruction", req.session);  
  req.session.destroy((err) => {
      if (err) {
          console.error('Error during logout:', err);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else {
          res.redirect('/admin/login');
      }
  });
}

module.exports = {
    loginAdmin,
    logoutAdmin
}