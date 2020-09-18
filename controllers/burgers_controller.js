const express = require("express");
const router = express.Router();
const burger = require("../models/burger");
// module.exports = routes.firstRoute;

// router.get
router.get("/", async (req, res) => {
  const condiOne = "devoured = 0";
  const condiTwo = "devoured = 1";
  try {
    const hbsObj = {
      newBurgers: await burger.selectAllWhere(condiOne),
      devouredBurgers: await burger.selectAllWhere(condiTwo),
    };
    console.log(hbsObj);
    res.render("index", hbsObj);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// router.post
router.post("/api/burgers", async (req, res) => {
  try {
    const result = await burger.insertOne(
      ["burger_to_eat", "burger_eaten"],
      [req.body.burger_to_eat, req.body.burger_eaten]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// router.put
router.put("/api/burgers/:id", async (req, res) => {
  const condition = "id = " + req.params.id;
  console.log("condition", condition);

  try {
    const result = await burger.updateOne(
      { devoured: req.body.burger_eaten },
      condition
    );

    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// router.delete
router.delete("/api/burgers/:id", async (req, res) => {
  const condition = "id = " + req.params.id;

  try {
    const result = await burger.deleteOne(condition);

    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Export routes for server.js to use.
module.exports = router;
