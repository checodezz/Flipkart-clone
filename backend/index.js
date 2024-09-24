import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import defaultData from "./default.js";
import Router from "./routes/route.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", Router)
const PORT = 3000
Connection()

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`)
})

defaultData();