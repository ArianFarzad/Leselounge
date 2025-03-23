import UserBook from '../models/UserBook';

export const getUsersBooks = async (userId: string) => {
  return await UserBook.find({ userId }).populate('bookId').exec();
}
