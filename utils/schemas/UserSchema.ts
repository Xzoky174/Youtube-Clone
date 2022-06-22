import mongoose from "mongoose";

export default new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
});
