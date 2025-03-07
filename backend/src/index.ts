import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import qouteRoutes from './routes/qoute.routes';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables!');
}
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/qoutes', qouteRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});