import mongoose from "mongoose";
import UserSchema from "./schemas/UserSchema";
import VideoSchema from "./schemas/VideoSchema";

export default async function connect() {
  const videosConn = await mongoose
    .createConnection(process.env.VIDEOS_MONGO_URI)
    .asPromise();
  const usersConn = await mongoose
    .createConnection(process.env.USERS_MONGO_URI)
    .asPromise();

  const Video = videosConn.model("Video", VideoSchema);
  const User = usersConn.model("User", UserSchema);

  return {
    Video,
    User,
  };
}
