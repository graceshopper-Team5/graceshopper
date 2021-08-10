const router = require("express").Router();
const {
  models: { Prop, Cart , Order},
} = require("../db");
const { /*requireToken,*/ isAdmin } = require('./gatekeepingMiddleware')
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
router.post('/', /*requireToken,*/ isAdmin, async (req, res, next) => {
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
router.put('/:id', /*requireToken,*/ isAdmin, async (req, res, next) => {
  try {
    // o: you can do this in one query => https://sequelizedocs.fullstackacademy.com/inserting-updating-destroying/#modelupdate
    const prop = await Prop.findByPk(req.params.id);
    const updatedProp = await prop.update(req.body);

    res.send(updatedProp);
  } catch (error) {
    next(error);
  }
});

// deleted an item
router.delete('/:id', /*requireToken,*/ isAdmin, async (req, res, next) => {
  try {
    // o: you can do this in one query => https://sequelizedocs.fullstackacademy.com/inserting-updating-destroying/#modeldestroy
    const prop = await Prop.findByPk(req.params.id);
    await prop.destroy();
    res.send(prop)
  } catch (err) {
    next(err)
  }
})

// o: why is this under the products api?

//THIS IS THE USER UPDATING THE CART
router.put('/users/:id', async (req, res, next) => {
  try {
    // const prop = await Prop.findByPk(req.params.id,
    //   {include: Order});
    console.log("req.body.increase")
    console.log(req.body.increase)
    console.log("req.params.id", req.params.id)

    // o: make sure to check if you can't find the cart
    const cart = await Cart.findOne(
      {where:
        {propId: req.params.id}})
    
    console.log("cart", cart)
    
    // o: I recommend changing this to req.body.type since this is confusing
    if(req.body.increase === "increase"){
      cart.quantity++
    }else{
      cart.quantity --
    }
    console.log("cart.quantity" , cart.quantity)
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

