const {
    MONGO_URI
} = require('../config/keys')
const mongoose = require("mongoose");
const dbconnect = () => {
    mongoose.connect(
        MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log("error in connection", err);
            } else {
                console.log("mongodb is connected");
            }
        });
}

module.exports = dbconnect;