import mongoose from "mongoose";

export default async function connect() {
  const usersConn = await mongoose
    .createConnection(process.env.USERS_MONGO_URI)
    .asPromise();
  const videosConn = await mongoose
    .createConnection(process.env.VIDEOS_MONGO_URI)
    .asPromise();

  const User = usersConn.model(
    "User",
    new mongoose.Schema({
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    })
  );

  const Video = videosConn.model(
    "Video",
    new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    })
  );

  return {
    usersClient: usersConn.getClient(),
    User,
    Video,
  };
}
