import 'dotenv/config';

export const __port__ = process.env.PORT;
export const __is_prod__ = process.env.NODE_ENV === 'production';
export const __mongo_uri__ = process.env.MONGO_URI;
