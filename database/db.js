const mongoose = require('mongoose');
require('dotenv').config()

const connectMongo = () => {
    const connectionUrl = process.env.DB_CONNECTION_URL
    mongoose.connect(connectionUrl)
    .then(() => {
        console.log("mongodb connected successfully"    )
    })
    .catch((err) => {
        console.log(`Not able to connect with mongodb, err: ${err}`)
    })
}

module.exports = {
    connectMongo
}