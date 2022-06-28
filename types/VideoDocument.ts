export type VideoDocument = {
  _id: string;
  title: string;
  path: string;
  author_id: string;
  likes: number;
  users_liked: Array<Number>;
  views: number;
  users_viewed: Array<Number>;
  comments: Array<Object>;
};
