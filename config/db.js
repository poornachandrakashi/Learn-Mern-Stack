const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');




const connectDB = async() =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true
        });
        console.log("Hurray Mongo DB Successfully connected!!!");
    }catch(err){
        console.error(err.message);
        //Exiting the process
        process.exit(1);
    }
}


module.exports = connectDB;