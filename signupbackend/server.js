const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 4000;

const routeUrls = require("./routes/router");

mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
    console.log("Connected to Database");
}).catch((error) => {
    console.log(error)
});

app.use(express.json());
app.use(cors());

app.use('/app',routeUrls);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));