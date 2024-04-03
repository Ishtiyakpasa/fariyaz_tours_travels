function isLoggedIn(req, res, next) {

            // Check if user is authenticated
            if (req.session && req.session.user) {
                res.locals.isLoggedIn = req?.session?.user ? true : false;
                // User is authenticated
                return next();
            }
            else{
                console.log("internal error");
            }
        // }catch (error) {
        //     console.error('Error in isloggedin', error);
        //     res.status(500).json({ error: 'Internal Server Error' });
        // }

    }
// Export the middleware function
// module.exports = isLoggedIn;