const mongoose = require("mongoose");

const connectToDb =function(URL){
    return mongoose.connect(URL);
}

module.exports = {
    connectToDb
};