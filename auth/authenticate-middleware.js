/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secret')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'invalid, you shall not pass!'})
      } else {
        res.user={username: decodedToken.username}
        next();
      }
    })
  }

  else {
    res.status(400).json({ message: 'Please login or create new user!!!' });
  }
};
