const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    // Check if there's an Authorization header with a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token, proceed as a guest (allow browsing without authorization)
    if (!token) {
        return next();
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // Determine the user type and fetch the user object
        let user;
        if (decoded.userId) {
            user = await User.findById(decoded.userId).select('-password');
        } else if (decoded.adminId) {
            user = await Admin.findById(decoded.adminId).select('-password');
        }

        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ message: 'User not found. Unauthorized access.' });
        }

        // Attach the user object to the request only if a valid user is found
        req.user = user;

        // Attach role to user
        req.user.role = user.role;

        // Proceed to the next middleware
        next();

    } catch (err) {
        // If token is expired or invalid, simply allow guest access by doing nothing
        return res.status(401).json({ message: 'Invalid token. Unauthorized access.' });
    }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
      return next();  // Proceed if the user is an admin
  }
  
  // If the user is not an admin, send an unauthorized response
  return res.status(403).json({ message: 'You are not authorized to access this route' });
};  

module.exports = {
  protect,
  isAdmin
};
