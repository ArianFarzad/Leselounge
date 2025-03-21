export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface IBook {
  _id: string;
  title: string;
  status: string;
  bookId: string;
  author: string;
  description: string;
  coverImageUrl: string | undefined;
}

export interface ApiBookResponse {
  _id: string;
  userId: string;
  bookId: IBook;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
