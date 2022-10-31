require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const MongoStore = require("connect-mongo");

const db = require("./db/dbConnection");
const momoRoute = require("./routes/momoRoute");
const beceRoute = require("./routes/beceCardRoute");
const categoryRoute = require("./routes/categoryRoute");
const voucherRoute = require("./routes/voucherRoute");

//Default server port
const port = process.env.PORT || 5000;

//initialize express
const app = express();
// app.set("trust proxy", 1);

// miiddleawares
app.use(logger("dev"));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_ID,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_LOCAL,
    }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
// app.use("/auth_key", momoRoute);
app.use("/bece", beceRoute);
app.use("/category", categoryRoute);
app.use("/voucher", voucherRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get((err, req, res, next) => {
  const error = new Error("Not found");
  const status = err.statusCode || 500;

  res.json({
    status: status,
    error: error.message,
  });
});

db.asPromise()
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((error) => {
    console.log("error connecting server", error);
  });
