import express, { NextFunction, Response } from 'express';
import { RequestWithUser } from './interfaces/RequestWithUser';
import connectToDb from './config/db';
import router from './router';
import ErrorHandler from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use((req: RequestWithUser, res: Response, next: NextFunction) => {
  req.user = {
    _id: '681e49864219fff3d6ece25d',
  };

  next();
});

connectToDb();
app.use('/', router);

app.use(ErrorHandler);

export default app;
