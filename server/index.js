require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LwM1GGRKsscBFNsDXIWT58NTpASDZs2bL4B4glfbOVOC1p7qGYKySuhMtADoofTeWkvDfPeSosZCdjsYJYER85n00WDhdBwZu"
);
const { v4: uuidv4 } = require('uuid');
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const sizeRouter = require("./routes/size");
const shoeRouter = require("./routes/shoe");
const checkoutRouter = require("./routes/checkout");
const orderRouter = require("./routes/order");
const feedbackRouter = require("./routes/feedback");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@selling-shoe.41bcea4.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/images", express.static("images"));

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/size", sizeRouter);
app.use("/api/shoe", shoeRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/feedback", feedbackRouter);



const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


