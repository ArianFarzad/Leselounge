import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  bookId: string;
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
}

const BookSchema = new Schema<IBook>(
  {
    bookId: {
      type: String,
      required: [true, 'Book ID is required'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Book = model<IBook>('Book', BookSchema);
export default Book;
