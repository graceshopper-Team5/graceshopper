const router = require("express").Router();
const {
  models: { Prop, Cart, Order, User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//cart handles all unfulfilled order
//cart has quantity, product, and user

// FETCHES the cart
router.get("/", requireToken, async (req, res, next) => {
  try {
    console.log("Fetching the cart fron back end!!!");
    const id = req.user.id;
    // we have either manipulated or created a cart table
    const cart = await Cart.findAll({
      // re-pull the cart in its new form, that matches the Id we we're dealing with previously
      where: {
        userId: id,
      },
    });
    res.send(cart);
  } catch (e) {
    next(e);
  }
});

router.delete("/", requireToken, async (req, res, next) => {
  try {
    console.log("We are in the backend!!", req.user);
    const userId = req.user.id;
    await Cart.destroy({
      where: {
        userId: userId,
      },
    });
    res.send(userId);
  } catch (e) {
    next(e);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  console.log("We are in Cart post route");
  try {
    const userId = req.user.id;
    const theUser = await User.findByPk(userId);
    const previousCart = await Cart.findOne({
      where: {
        userId: userId,
      },
    });
    console.log("Previous", previousCart);
    if (previousCart) {
      await previousCart.setProps(req.body.id);
    } else {
      await theUser.addProps(req.body.id);
    }
  } catch (e) {
    next(e);
  }
});
