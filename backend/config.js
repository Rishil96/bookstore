import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const dbUserName = process.env.DATABASE_USERNAME;
export const dbPassword = process.env.DATABASE_PASSWORD;
export const mongoDBURL = `mongodb+srv://${dbUserName}:${dbPassword}@bookstore.lqz8n.mongodb.net/books-collection?retryWrites=true&w=majority&appName=bookstore`;
