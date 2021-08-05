const router = require("express").Router();
const {
  models: { Prop },
} = require("../db");
module.exports = router;

// fetches products
router.get("/", async (req, res, next) => {
  try {
    // o: any reason why you are filtering your attributes here?
    const Props = await Prop.findAll({
      attributes: [
        "id",
        "name",
        "movieTitle",
        "movieYear",
        "price",
        "imageUrl",
        "description",
      ],
    });
    res.json(Props);
  } catch (err) {
    next(err);
  }
});

// o: make sure to check for when you don't find a product
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
