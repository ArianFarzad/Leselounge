export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface IBook {
  _id: string;
  title: string;
  bookId: string;
  author: string;
  description: string;
  coverImageUrl: string | undefined;
}
