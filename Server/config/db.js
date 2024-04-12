import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(function (connection) {
        console.log(`Connected to MongoDB : ${connection.host}`);
    }).catch((err)=> {
        console.log(err);
        process.exit(1);
    })
}

export default connectDB;