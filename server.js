import express from 'express';
import mongoose from 'mongoose';
import Listing from "./models/listing.js";
import cookieParser, { signedCookie } from 'cookie-parser';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from "passport-local";
import User from './models/user.js';

// import initData from './init/data.js';
import path from 'path';
import methodOverride from 'method-override';
import engine from 'ejs-mate';
import wrapAsync from './utils/wrapAsync.js';
import { schema, reviewSchema } from "./schema.js";
import ExpressError from './utils/ExpressError.js';
import Review from './models/review.js';

import.meta.url;
import { fileURLToPath } from 'url'; // Naya import
import { dirname } from 'path';     // Naya import
import { validateHeaderName } from 'http';

import listings from './router/listing.js';
import reviewRouter from './router/reviews.js';
import session from 'express-session';
import userRouter from './router/users.js';

// // __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));


// Override with POST having ?_method=DELETE or ?_method=PUT in the URL query
app.use(methodOverride('_method'));


const sessionOptions = {
  secret: "supersecreatcode",
  resave: false,
  saveUninitialized: true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge :  7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use("local", new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", userRouter);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviewRouter);
app.use(cookieParser("secretcode"));

// app.get("/demouser", (req,res)=>{
//   let fakeUser = new User {
//    email : "vednt@gmail.com",
//    username : "vedant"
//   };
//   res.send(fakeUser);
// })



app.get("/demouser", async (req,res)=>{
  let fakeUser = new User( {
    email : "vedya@gmail.com"  ,
    username: "vedant_payghan"  ,
  });

  let registeredUser = await User.register(fakeUser, "password");
  res.send(registeredUser);
});




app.get("/register", (req, res) => {
  let {name='anonymous'}  = req.query;
  req.session.name = name;
  res.send(`Hello ${name}`);
});

app.get("/test", (req,res)=>{
  res.send(`Hey we are just testing to you buddy ${req.session.name}`);
})





// app.get("/sendcookie", (req,res)=>{
//  res.cookie("movie", "Mumbai-pune-mumbai", {signed: true});
//   res.send("cookie sent");
// });

// app.get("/verify", (req,res)=>{
//   console.log(req.signedCookies); 
// });



// app.all("*", (req,res,next)=>{
//  next(new ExpressError(404, "Page not Found!"));
// });

// Connect to Database
const MONGO_URI = 'mongodb://127.0.0.1:27017/airbnb';
mongoose.connect(MONGO_URI)
  .then((res) => {
    console.log("✅Mongo DB Connected")
  })
  .catch((err) => {
    console.log("MongoDB not connected");
  });

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(PORT, () => {
  console.log("🚀Server is running on port ", PORT);
});