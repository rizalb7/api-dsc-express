const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categoryController.getMultiple(req.query.page));
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    res.json(await categoryController.getAll());
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

module.exports = router;
