const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/AuthRoute.js");
const bungalowRouter = require("./routes/BungalowRoute.js");
const reservationRouter = require("./routes/ReservationRoute.js");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
dotenv.config();
app.set("view engine", "ejs");
app.set("views", "./templates");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`mongodb connected!`))
  .catch((err) => console.log(`mongodb connection error: ${err}`));

app.use("/", authRouter);
app.use("/bungalow", bungalowRouter);
app.use("/reservation", reservationRouter);

// Server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
