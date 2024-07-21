const express = require('express');
const router = express.Router();
const adminModel = require("../Models/AdminSchema");

// Route to create admin
if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            let admin = await adminModel.find();
            if (admin.length > 0) {
                return res.status(501).send("You cannot create another admin");
            }

            const { fullname, email, password } = req.body;

            if (!fullname || !email || !password) {
                return res.status(400).send("All fields are required");
            }

            let createdAdmin = await adminModel.create({
                fullname,
                email,
                password
            });

           
            res.status(200).json({
                message: "Admin created successfully",
                admin: createdAdmin
            });
        } catch (error) {
            console.error("Error creating admin:", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    });
}

router.get("/", (req, res) => {
    res.send("admin route");
});

module.exports = router;
