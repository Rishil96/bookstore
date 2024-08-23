import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';

/* 
MongoDB
rishil
j5EQfjLHBJZ77EEk
*/

const app = express();

// Middleware to parse body that comes in JSON format
app.use(express.json());

// Home route
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to BookStore");
});


// Route to save books in book store
app.post("/books", async (request, response) => {
    try {
        // Check if all required inputs are received in post request
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all the required fields to add a book -> (title, author, publishYear)" });
        }
        // Create book object with required details
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        // Make an entry in database using mongoose model
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Connect to mongoDB database using mongoose library and only run express application if connection is successful
mongoose
    .connect(mongoDBURL)
    .then(() => {                   // Runs when no error occurred
        console.log("Database connection successful!")
        /* 
            Start the HTTP Server and takes port number and host optionally on which the server will be available on.
            Port: A number representing the port on which the server should listen (e.g., 3000).
            Hostname (optional): A string representing the hostname or IP address to bind to (default is localhost or 0.0.0.0).
            Callback (optional): A function to execute once the server starts listening for requests.
        */
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}!`);
        });

        })
        .catch((error) => {         // Runs when error occurred
            console.log(mongoDBURL);
            console.log(`Error while connecting to database: ${error}`);
        });