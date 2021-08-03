const router = require('express').Router()
const { models: { products }} = require('../db')
module.exports = router

// fetches products
router.get('/', async (req, res, next) => {
  try {
    const products = await products.findAll({
      attributes: ['id', 'productname']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
