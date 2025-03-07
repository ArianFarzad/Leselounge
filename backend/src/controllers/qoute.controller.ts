import { Request, Response } from 'express';

export const get_qoute = async (req: Request, res: Response) => {
  const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}