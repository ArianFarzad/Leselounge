export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string | undefined;
}
