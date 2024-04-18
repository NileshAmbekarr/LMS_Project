import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL || `mongodb://127.0.0.1:27017/lms`)
    .then(function (connection) {
        console.log(`Connected to MongoDB : ${connection.host}`);
    }).catch((err)=> {
        console.log(err);
        process.exit(1);
    })
}

export default connectDB;