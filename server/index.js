import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const port = process.env.PORT || 3001;
import userRoutes from "./routes/users.js";
import { signup, login } from "./controllers/auth.js";
import { authorizationMiddeleware } from "./middlewares/auth.js";

const app = express();
// import { errorToJSON } from "next/dist/server/render.js";
import passportjwt from "passport-jwt";
const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;
import User from "./models/auth.js";
import passport from "passport";
import { newQuestion } from "./controllers/ask.js";
import { getallQuestions } from "./controllers/ask.js";
import { Questionbyname } from "./controllers/ask.js";
import { addAnswers } from "./controllers/ask.js";
import { upvote } from "./controllers/ask.js";
import { downvote } from "./controllers/ask.js";
app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "GauravKishore";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    //   if (jwt_payload.exp < Date.now() / 1000) {
    //     return done(null, false);
    // }

    // // Check if token is revoked
    // if (blacklist.has(jwt_payload.token)) {
    //     return done(null, false);
    // }
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
      if (err) {
        console.log(err);
        return done(err, false);
      }
      if (user) {
        console.log(user);

        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.post("/user/signup", async (req, res) => {
  await signup(req, res);
});
app.post("/user/login", async (req, res) => {
  await login(req, res);
});
app.post("/askquestion", authorizationMiddeleware, async (req, res) => {
  await newQuestion(req, res);
});
app.get("/get/allquestions",authorizationMiddeleware,async(req,res)=>{
  await getallQuestions(req,res);
})
app.get("/get/question/:title",authorizationMiddeleware,async(req,res)=>{
  await Questionbyname(req,res);
})
app.post("/add/answer",authorizationMiddeleware,async(req,res)=>{
   await addAnswers(req,res);
})
app.post("/ans/upvote",authorizationMiddeleware,async(req,res)=>{
  await upvote(req,res);
})
app.post("/ans/downvote",authorizationMiddeleware,async(req,res)=>{
  await downvote(req,res);
})
// app.use('/user',userRoutes)
const CONNECTION_URL =
  "mongodb+srv://gaurav_kishore:tZ6vMI8xOmXMPfRo@cluster0.dz5sa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      console.log("Connection established");
    });
  })
  .catch((err) => console.log("MongoDB Connection Error:", err.message));
