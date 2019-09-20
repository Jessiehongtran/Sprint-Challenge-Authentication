const router = require('express').Router();
const bcrypt = require('bcryptjs')
const db = require('../helpers/auth-model')
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secret')
const authenticate = require('./authenticate-middleware')

router.post('/register', (req, res) => {
  // implement registration
  let user=req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  console.log(user.password)

  db.addUser(user)
    .then(saved=> {
      res.status(200).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  db.findUser({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,token
        }) 
      } else {
        res.status(401).json({message: 'Invalid credentials'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

function generateToken(user){
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secrets.jwtSecret, options)
}

router.get('/users', authenticate, (req,res)=> {
  db.getUser()
    .then (users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router;
