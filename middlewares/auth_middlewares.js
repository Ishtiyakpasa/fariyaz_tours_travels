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
    if (req.session && req.session.user) {
      // User is authenticated
      return next();
    } else {
      // User is not authenticated, redirect to user login page
      res.redirect('/user/login');
    }
  }
  
  module.exports = {
    requireAdminAuth,
    requireUserAuth,
  };