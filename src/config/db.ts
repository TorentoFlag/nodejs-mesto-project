import mongoose, { ConnectOptions } from 'mongoose';

const url = 'mongodb://localhost:27017/mestodb';

const connectToDb = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err);
    process.exit(1);
  }
};

export default connectToDb;
