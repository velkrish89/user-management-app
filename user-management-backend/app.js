const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/user_router");
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB).then(() => {
    console.log("Db connected!!!")
}).catch(() => {
    console.log("Db not connected");
})

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log("Listening to port no:", process.env.PORT);
})
