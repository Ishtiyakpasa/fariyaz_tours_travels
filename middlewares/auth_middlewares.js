// authMiddleware.js

function requireAdminAuth(req, res, next) {
    if (req.session && req.session.admin) {
      // Admin is authenticated
      return next();
    } else {
      // Admin is not authenticated, redirect to admin login page
      res.redirect('/admin/login');
    }
  }
  
  function requireUserAuth(req, res, next) {
    try {
        // Check if user is authenticated
        if (req.session && req.session.user) {
            // User is authenticated
            return next();
        } else {
            // User is not authenticated, redirect to user login page
            res.redirect('/user/user_login');
        }
    } catch (error) {
        console.error('Error in requireUserAuth middleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function isLoggedIn(req, res, next) {
  // Check if user is authenticated
  if (req.session && req.session.user) {
      // User is authenticated
      res.locals.isLoggedIn = true;
      return next();
  } else {
      // User is not authenticated
      res.locals.isLoggedIn = false;
      next(); // Call next to pass control to the next middleware or route handler
  }
}
// }catch (error) {
//     console.error('Error in isloggedin', error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }

  
  module.exports = {
    requireAdminAuth,
    requireUserAuth,
    isLoggedIn
  };