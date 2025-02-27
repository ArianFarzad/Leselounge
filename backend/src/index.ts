import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/buchcommunity')
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB Verbindungsfehler:', err));


app.get('/', (req: Request, res: Response) => {
    res.send('Backend läuft!');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});