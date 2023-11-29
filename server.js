require('dotenv').config()
const express = require('express')
const cookieParser = require ("cookie-parser");
const mongoose = require("mongoose");
const userRoutes = require ('./routes/userRoutes')


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" })); //parser json data inside the req body;
app.use(express.urlencoded({ extended: true })); // parser form data inside the req body;
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.get("/", (req, res) => {
  res.send("Welcome Home🏡");
});

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => console.log(console.error(err)));
