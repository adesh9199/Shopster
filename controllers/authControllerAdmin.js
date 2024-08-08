const ownerModel = require("../models/owner-model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const productModel = require("../models/product-model");

module.exports.registerAdmin = async function (req, res) {
  try {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(403).send("You don't have permission to create a new owner."); // Use 403 Forbidden
    }

    const { fullname, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the owner
    await ownerModel.create({
      email,
      password: hash,
      fullname,
    });

    res.status(201).send("Admin registered successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.loginAdmin = async function (req, res) {
  try {
    const { email, password } = req.body;

    const admin = await ownerModel.findOne({ email });
    if (!admin) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/owners/login");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      const token = generateToken(admin);
      res.cookie("admin_token", token, { httpOnly: true });
      res.redirect("/owners/admin");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/owners/login");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.logout = function (req, res) {
  res.clearCookie("admin_token");
  res.clearCookie("user_token"); // Ensure both cookies are cleared if needed
  res.redirect("/");
};

module.exports.deleteProducts = async function (req, res) {
  try {
    const { password } = req.body;
    const admin = await ownerModel.findOne(); // Adjust this if you need to find a specific admin

    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Password is correct; proceed with deletion
    await productModel.deleteMany({});
    res.status(200).send("All products deleted successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
