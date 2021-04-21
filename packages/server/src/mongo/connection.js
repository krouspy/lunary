import mongoose from 'mongoose';
import { __mongo_uri__ } from '@config';

mongoose.connect(__mongo_uri__, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

export default mongoose;
