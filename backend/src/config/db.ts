import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string || "", {
            
            // Ensure the URI is cast as a string
         dbName: "feedbackly",
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};


export default connectDB;