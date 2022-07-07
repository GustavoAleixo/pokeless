import 'dotenv/config'
import mongoose from "mongoose";

async function createConnection() {
    mongoose.connect(
        process.env.MONGO_DB_URL,
        {
            useNewUrlParser: true
        }
    );
}

createConnection()