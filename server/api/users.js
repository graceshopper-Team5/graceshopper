const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// fetches USERS
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    console.log(users)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.id)
    console.log(users)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Authorization & Security (Prevent Injection Attacks)
    // We only want to take information that is given through username and password
    // for example, someone can use postman to change the admin field and make themselves admin
    const {username, password} = req.body
    res.status(201).send(await User.create({username, password}))

  } catch (err) {
    next(err)
  }
})