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
router.post('/signup', async (req, res, next) => {
  try {
    // o: can you identify the security concern here
    //  make sure to whitelist user keys you want to save before creating
    const user = await User.create(req.body)
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
