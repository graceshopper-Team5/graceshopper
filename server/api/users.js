const router = require('express').Router()
const { models: { User }} = require('../db')
const {requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router

// fetches USERS
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    // if we managed to make it PAST require token, we can guarantee that we have a user! & we have access to req.user
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

router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.id)
    console.log(users)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user)
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

/* have validated data to ensure reliability.
i.e. each customer that creates an account should only be able to do so once with a single email address. */