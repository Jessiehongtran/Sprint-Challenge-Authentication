const router = require('express').Router();
const bcrypt = require('bcryptjs')
const db = require('../helpers/auth-model')

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
});

module.exports = router;
