const express = require('express');
const router = express.Router();
const users = require('../database/models/login.js');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if required fields are missing
        if (!email || !password || !name) {
            return res.status(400).send("Data is incorrect!!");
        }

        // Check if user already exists
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("User already exists!!");
        }

        // Create a new user
        const newUser = new users(req.body);
        await newUser.save();

        console.log('One item inserted successfully....');
        return res.status(201).send("Inserted successfully");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message || "Internal Server Error");
    }
});

router.post('/signin', async(req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).send("Data is incorrect!!");
    }

    const existingUser = await users.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).send("User does not exists!!");
    }
    if (existingUser.password != password) {
        return res.status(400).send("email or password is incorrect!!")
    }

    res.status(200).send("logged in!!")


})

module.exports = router;
