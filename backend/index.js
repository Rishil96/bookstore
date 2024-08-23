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


// Route to get all books
app.get("/books", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        return response.status(500).send({ message: error.message });
    }
});


// Route to get a book by ID
app.get("/books/:id", async (request, response) => {
    try {

        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        return response.status(500).send({ message: error.message });
    }
});


// Route to update a book
app.put("/books/:id", async (request, response) => {
    try {
        // Check if any data is missing to be updated
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "To update a book, send all the details: title, author and publishYear"});
        }
        
        const { id } = request.params;
        
        // Find book by id using mongoose model and update
        const result = await Book.findByIdAndUpdate(id, request.body);
        // False here means there was no book with given ID
        if (!result) {
            return response.status(404).send({ message: `Book with ID ${id} not found`})
        }
        return response.status(200).send({ message: `Book with ID ${id} was updated successfully!`});

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message : error.message });
    }
});


// Route to delete a book
app.delete("/books/:id", async (request, response) => {
    try {
        // Find book by ID and delete it
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        // Check if book was found and deleted successfully
        if (!result) {
            return response.status(404).send({ message: error.message });
        }
        return response.status(200).send({ message: `Book with ID ${id} was deleted!`});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})


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