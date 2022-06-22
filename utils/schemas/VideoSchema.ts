import mongoose from "mongoose";

export default new mongoose.Schema({
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
});
