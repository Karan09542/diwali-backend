var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require("dotenv");
const { dbConfig } = require("./configuration/db.config");
const { userRouter } = require("./routers/user.router");
const bodyParser = require("body-parser");
const { geminiRouter } = require("./routers/gemini.router");
var cookieParser = require("cookie-parser");

dotenv.config();

// middlwares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // Allow cookieParser
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.status(200).json({ Message: "Happy Diwali" });
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/gemini", geminiRouter);

var PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await dbConfig();
  console.log(`Listening to the port ${PORT}`);
});