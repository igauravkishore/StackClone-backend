import mongoose from "mongoose";
const Ask = mongoose.Schema({
  votes: {
    type: Number,
    required: false,
  },
  numanswer: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
   answer:[{
      type:String,
      default:""
   }],
  askedOn: {
    type: String,
  },
  artist:{
    type: mongoose.Types.ObjectId,
    ref: "User",
}
});
export default mongoose.model("Question", Ask);
