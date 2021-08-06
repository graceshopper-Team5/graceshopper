const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

//LOGIN ROUTE
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})

//SIGN UP route
// awaiting the creation of a new user instance
// sending back the new user input 
// sending back the user's token to the db
router.post('/signup', async (req, res, next) => {
  try {
  // our api end-point will NOT allow for clients to make themselves admins
  // we have have to watch our for injection attacks!

    const {username, email, password } = req.body
    const user = await User.create({username, email, password});
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
