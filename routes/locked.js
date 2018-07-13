const express = require('express');
const router = express.Router();

router.get("/test", (req, res) => {
  console.log('hi');
  res.send("You have accessed the protected route. Dang.");
});

module.exports = router;
