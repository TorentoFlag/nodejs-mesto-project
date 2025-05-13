import { Date } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  owner: string;
  likes: string[];
  createdAt: Date
}
