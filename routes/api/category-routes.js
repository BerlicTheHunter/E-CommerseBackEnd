const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategoryData) {
      res.status(404).json({ message: "No catagory found with that id!" });
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const newCatagory = await Category.create({
      categoryName: req.body.categoryName,
    });
    res.status(200).json(newCatagory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatagory = await Category.update({
      categoryName: req.body.categoryName,
    },
    {
      where: {
         id: req.perams.id,
      },
    });
    res.status(200).json(updateCatagory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;