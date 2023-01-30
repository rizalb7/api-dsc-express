const express = require("express");
const router = express.Router();
const placesController = require("../controllers/places");

router.get("/", async (req, res, next) => {
  try {
    res.json(await placesController.getMultiple(req.query.page));
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

router.get("/cat/:cid", async (req, res, next) => {
  try {
    res.json(
      await placesController.getCategory(req.params.cid, req.query.search)
    );
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

router.get("/gallery/:pid", async (req, res, next) => {
  try {
    res.json(await placesController.getGallery(req.params.pid));
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

router.get("/rating/:pid", async (req, res, next) => {
  try {
    res.json(await placesController.getRating(req.params.pid));
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
});

module.exports = router;
