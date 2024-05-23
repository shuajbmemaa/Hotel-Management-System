import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set("strict", true);
    return mongoose.connect(url);
};

export default connectDB;