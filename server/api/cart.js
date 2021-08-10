const router = require("express").Router();
const {
  models: { Prop, Cart , Order, User},
} = require("../db");
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router;

//cart handles all unfulfilled order
//cart has quantity, product, and user

// FETCHES the cart
router.get("/", requireToken, async (req, res, next) => {
  try {
    const id = req.user.id;
    // we have either manipulated or created a cart table
    const cart = await Cart.findAll({
    // re-pull the cart in its new form, that matches the Id we we're dealing with previously
    where: {
      userId: id,
    }});
    res.send(cart);
  } catch (e) {
    next(e);
  }
})

router.delete("/", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Cart.destroy({
      where: {
        userId: userId,
      },
    });
    res.send(userId);
  } catch (e){
    next(e);
  }
})

router.post("/", requireToken, async (req, res, next) => {
  try {
    // pulling the user ID
    const userId = req.user.id;
    // finding the User
    const theUser = await User.findByPk(userId);
    // if there is a cart associated with the ID (if a cart has already been created)
    // in sequelize we are creating the table, the setProps magic method is what we are using to add an item to the CART
    if (Cart.userId === userId) {
      // adding the item to an already existing cart (a pre-existing table)
      await theUser.setProps(req.body.id);
    } else {
      // create the cart-table, if there is no cart table already associated with the id
      await theUser.addProps(req.body.id);
    }
    // we have either manipulated or created a cart table
    const cart = await Cart.findAll({
      // re-pull the cart in its new form, that matches the Id we we're dealing with previously
      where: {
        userId: userId,
      },
    });
    // send up to front-end
    res.send(cart);
  } catch (e) {
    next(e);
  }
});
