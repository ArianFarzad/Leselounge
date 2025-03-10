import { Schema, model, Document, Types } from 'mongoose';

interface IUserBook extends Document {
    userId: Types.ObjectId;
    bookId: Types.ObjectId;
    status: 'reading' | 'read' | 'onHold';
}

const UserBookSchema = new Schema<IUserBook>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: [true, 'Book ID is required'],
        },
        status: {
            type: String,
            enum: ['reading', 'read', 'onHold'],
            required: [true, 'Status is required'],
        },
    },
    {
        timestamps: true,
    },
);

const UserBook = model<IUserBook>('UserBook', UserBookSchema);
export default UserBook;