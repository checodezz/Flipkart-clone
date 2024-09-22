import mongoose from "mongoose";

export const Connection = async () => {
    const URL = process.env.MONGODB_URL
    try {

        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log("Database Connected Successfully.");
    } catch (error) {
        console.log("Error while connecting with database", error);
    }
}

export default Connection