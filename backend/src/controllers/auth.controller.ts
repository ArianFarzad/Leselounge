import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/token';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists!' });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user: ', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'User not found!' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid password!' });
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ', error });
  }
};
