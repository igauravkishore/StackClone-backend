import express from "express";
import { authorizationMiddeleware } from "../middlewares/auth.js";
const router = express.Router();

import Ask from "../models/ask.js";

export const newQuestion = async (req, res) => {
  const { title, quesbody } = req.body;
  if (!title || !quesbody) {
    return res.status(302).json({ err: "Incomplete Details" });
  }
  const date = new Date();
  const artist = req.user._id;
  const detail = {
    votes: 0,
    numanswer: 0,
    title: title,
    body: quesbody,
    answer: [],
    askedOn: date,
    artist: artist,
  };
  const createquestion = await Ask.create(detail);
  return res.status(200).json(createquestion);
};

export const getallQuestions = async (req, res) => {
  const curruser = req.user._id;
  const questions = await Ask.find({ artist: curruser });
  return res.status(200).json({ data: questions });
};

export const Questionbyname = async (req, res) => {
  const quesname = req.params.title;
  const question = await Ask.findOne({ title: quesname });
  if (!question) {
    return res.status(301).json("Question not found");
  }
  return res.status(200).json({ data: question });
};

export const addAnswers = async (req, res) => {
  const {ans,title} = req.body;
  const ques= await Ask.findOne({title:title});
  
  if (!ans ||!ques) {
    res.status(301).json("Enter a valid answer");
  }
  ques.answer.push(ans);
  await ques.save();
  return res.status(200).json({data:ques.answer});
};

export const upvote= async(req,res)=>{
  const {title }= req.body;
  const ques= await Ask.findOne({title:title});
  if(!title || !ques){
    return res.status(301).json("Invalid info");

  }
  let vote= ques.votes;
  vote= vote+1;
  ques.votes= vote;
  await ques.save();
  return res.status(200).json(ques);

}

export const downvote= async(req,res)=>{
  const {title }= req.body;
  const ques= await Ask.findOne({title:title});
  if(!title || !ques){
    return res.status(301).json("Invalid info");

  }
  let vote= ques.votes;
  vote= vote-1;
  ques.votes= vote;
  await ques.save();
  return res.status(200).json(ques);

}
