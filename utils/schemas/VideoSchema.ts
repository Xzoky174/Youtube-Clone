import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
}).index({ title: "text" });

export default VideoSchema;
