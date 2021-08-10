const router = require("express").Router();
const {
  models: { Prop, Cart , Order, User},
} = require("../db");
const { /*requireToken,*/ isAdmin } = require('./gatekeepingMiddleware')
module.exports = router;


// o: is this being used?

//cart handles all unfulfilled order
//cart has quantity, product, and user


//remember to change thunk route
// router.post("/", async (req, res, next)  => {
//   try {
//     const newCart = await Cart.create(req.body);
//     console.log("newCart", newCart)
//     console.log("req.body", req.body);
//     const id = req.params.id;
//     const theUser = await User.findByPk(id, {include: Cart});
//     console.log("theUser", theUser)
//     theUser.addProduct(newCart);
//     res.send(theUser);
//   }catch(e) {
//     next(e);
//   }
// })