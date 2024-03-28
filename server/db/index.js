const mongoose= require('mongoose');

const connectDB= async function(){
    try {
        await mongoose.connect('mongodb://localhost:27017/photogram');
        return mongoose.connection.host;
    } catch (error) {
        console.log(error)
    }
}

module.exports= connectDB;