const router = require("express").Router();
const {
  models: { Prop },
} = require("../db");
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router;

// fetches  all products/ items
router.get("/", async (req, res, next) => {
  try {
    const Props = await Prop.findAll();
    res.json(Props);
  } catch (err) {
    next(err);
  }
});

// Post route for adding items
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Prop.create(req.body));
  } catch (err) {
    next(err)
  }
})

// fetches individual products /items 
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Prop.findByPk(req.params.id);
    if(product) {
      res.json(product);
    } else {
      next({ message: "some problem occured", status: 404})
    }
  } catch (err) {
    next(err);
  }
});

// editing an item
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const prop = await Prop.findByPk(req.params.id);
    const updatedProp = await prop.update(req.body);
    res.send(updatedProp);
  } catch (error) {
    next(error);
  }
});

// deleted an item
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const prop = await Prop.findByPk(req.params.id);
    await prop.destroy();
    res.send(prop)
  } catch (err) {
    next(err)
  }
})
