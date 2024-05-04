const express = require('express');
const router = express.Router();
const Insight = require('../database/models/insignt.js');

router.post('/', async (req, res) => {
    const { name, status, feedback, rating } = req.body;
    if (!name || !status || !feedback || !rating) {
        return res.status(400).send("Data is incorrect!!");
    }

    try {
        const newInsight = new Insight({
            name: name,
            status: status,
            feedback: feedback,
            rating: rating
        });
        await newInsight.save();
        console.log('One item inserted successfully....');
        return res.status(201).send("Inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send("Internal server error");
    }
});

router.get('/', async (req, res) => {
    try {
        const datas = await Insight.find(); 
        return res.status(200).send(datas);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).send("Internal server error");
    }
});

router.put('/', async (req, res) => {
    try {
        let updateInsight = {};
        if (req.body.name) updateInsight.name = req.body.name;
        if (req.body.status) updateInsight.status = req.body.status;
        if (req.body.feedback) updateInsight.feedback = req.body.feedback;
        if (req.body.rating) updateInsight.rating = req.body.rating;

        await Insight.findByIdAndUpdate(req.body._id, { $set: updateInsight });
        console.log('One item updated successfully....'); 
        return res.status(200).send("Updated successfully"); 
    } catch (err) {
        console.error("Error updating data:", err); 
        return res.status(500).send(`Internal server error: ${err}`); 
    }
});

router.delete('/', async (req, res) => {
    try {
        let _id = req.body._id;
        await Insight.deleteOne({ _id: _id }); 
        console.log('One item deleted successfully....');
        return res.status(200).send("Deleted successfully"); 
    } catch (err) {
        console.error("Error deleting data:", err);
        return res.status(500).send(`Internal server error: ${err}`); 
    }
});

module.exports = router;
