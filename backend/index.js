import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import defaultData from "./default.js";
const app = express();

dotenv.config();


const PORT = 3000
Connection()

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`)
})

defaultData();