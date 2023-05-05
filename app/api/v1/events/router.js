const express = require("express");
const router = express.Router();
const {
  create,
  index,
  find,
  update,
  destroy,
  changeStatus,
} = require("./controller");

router.get("/events", index);
router.get("/events/:id", find);
router.put("/events/:id", update);
router.delete("/events/:id", destroy);
router.post("/events", create);
router.put("/events/:id/status", changeStatus);

module.exports = router;
