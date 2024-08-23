import express from 'express';
import { Book } from '../models/bookModel.js'

const router = express.Router();


// Route to save books in book store
router.post("/", async (request, response) => {
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
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
    try {

        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        return response.status(500).send({ message: error.message });
    }
});


// Route to update a book
router.put("/:id", async (request, response) => {
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
router.delete("/:id", async (request, response) => {
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
});


export default router;