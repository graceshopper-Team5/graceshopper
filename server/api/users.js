const router = require("express").Router();
const {
  models: { User, Cart, Prop },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

// fetches USERS
router.get("/", /*requireToken,*/ isAdmin, async (req, res, next) => {
  try {
    // if we managed to make it PAST require token, we can guarantee that we have a user! & we have access to req.user
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    console.log(users);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", /*requireToken,*/ isAdmin, async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.id);
    console.log(users);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", /*requireToken,*/ isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // Authorization & Security (Prevent Injection Attacks)
    // We only want to take information that is given through username and password
    // for example, someone can use postman to change the admin field and make themselves admin
    const { username, password } = req.body;
    res.status(201).send(await User.create({ username, password }));
  } catch (err) {
    next(err);
  }
});

// FETCHES the cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
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

router.delete("/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Cart.destroy({
      where: {
        userId: id,
      },
    });
    res.send(id);
  } catch (e){
    next(e);
  }
})

router.post("/:id/cart", async (req, res, next) => {
  try {
    // pulling the user ID
    const id = req.params.id;
    // finding the User
    const theUser = await User.findByPk(id);
    // if there is a cart associated with the ID (if a cart has already been created)
    // in sequelize we are creating the table, the setProps magic method is what we are using to add an item to the CART
    if (Cart.userId === id) {
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
        userId: id,
      },
    });
    // send up to front-end
    res.send(cart);
  } catch (e) {
    next(e);
  }
});
//find Cart.findByPk(userId, {includes: props})

/* have validated data to ensure reliability.
i.e. each customer that creates an account should only be able to do so once with a single email address. */
