const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const User = require("../models/user-model");

// Route to handle location updates
router.post("/update-location", isLoggedIn, async (req, res) => {
  try {
    const { location } = req.body;
    const user = await User.findById(req.user._id); // Assuming req.user contains the logged-in user's data
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.addLocation(location);
    res.status(200).send("Location updated successfully");
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).send("Server error");
  }
});

router.get("/", function (req, res) {
  res.send("hey it's working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
