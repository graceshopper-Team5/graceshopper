const router = require("express").Router();
const {
  models: { Prop },
} = require("../db");
module.exports = router;

// fetches products
router.get("/", async (req, res, next) => {
  try {
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

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Prop.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
