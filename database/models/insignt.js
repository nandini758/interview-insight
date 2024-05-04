const mongoose = require('mongoose');

const insigntSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    status: {
        type: String, 
        require: true
    }, 
    feedback: {
        type: String,
    }, 
    rating: {
        type: Number
    }
})

const insight = mongoose.model("insight", insigntSchema)

module.exports = insight