const mongoose = require("mongoose");

require("dotenv").config();

const connect_DB = async (req, res) => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("MongoDB Connected Successfully.....")
    ).catch((error)=>{
        console.error(error);
        console.log("Connection Failed while connected DB.....");
        process.exit(1);
    })
};

module.exports = connect_DB;
