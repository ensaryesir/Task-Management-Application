//Express and Helpers
const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//Cookie and Session Handling
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Database Operations
const mongoose = require("mongoose");

//Method Override
const methodOverride = require("method-override");

//JWT and Web Push
const jwt = require("jsonwebtoken");
const webpush = require('web-push');

//Notifications
const Notification = require('node-notifier');

// Local MongoDb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/TaskManagementApplicationDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.set("view engine", "ejs"); // Defining the image engine
app.set("views", path.join(__dirname, "app-server", "views")); // Specifying the folder where the images will be located
//app.use(ejsLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: "mysecretkey", // Set a secure key
    resave: false,
    saveUninitialized: true,
    // Other session options can be added here
  })
);

const router = require("./app-server/routes/router");
app.use("/", router);

const homeRouter = require("./app-server/routes/home-router");
app.use("/", homeRouter);

const indexRouter = require("./app-server/routes/main-page-router");
app.use("/", indexRouter);

const authRouter = require("./app-server/routes/auth-router");
app.use("/", authRouter);

//Accessing the Public folder (this process is called mapping)
//(app-server/views/view-app/public)
app.use("/public-app", express.static(path.join(__dirname, "app-server", "views", "view-app", "public-app")));
//(app-server/views/view-home/public)
app.use("/public-home", express.static(path.join(__dirname, "app-server", "views", "view-home", "public-home")));

app.use(methodOverride("_method"));

const publicVapidKey = 'BMYo01tmY4u3KYkOr_uR_NdonUF_1wafEzVc1CUBizk589YzG9K4hmeEiJG7J-zGwA4suxstRTz7rMrWCUP84AQ';
const privateVapidKey = 'EJbDcDJSTfF8jJd5dtc_ihAwYa_MqhgpBsbmctATFFw';

//Setting vapid keys details
webpush.setVapidDetails('mailto:yesirensar@gmail.com', publicVapidKey,privateVapidKey);

const port = 7000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
