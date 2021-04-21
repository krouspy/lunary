import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'
import routes from './api/routes';
import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
