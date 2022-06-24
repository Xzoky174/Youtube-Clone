import mongoose from "mongoose";
import UserSchema from "./schemas/UserSchema";
import VideoSchema from "./schemas/VideoSchema";

export default async function connect() {
  const videosConn = (await mongoose.connect(process.env.VIDEOS_MONGO_URI))
    .connection;
  const usersConn = videosConn.useDb("Users");

  const Video =
    videosConn.models.Video || videosConn.model("Video", VideoSchema);
  const User = usersConn.models.User || usersConn.model("User", UserSchema);

  return {
    Video,
    User,
  };
}
