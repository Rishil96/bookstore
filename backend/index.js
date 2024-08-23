import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';


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


// Import booksRoute router as middleware, first param is prefix of URL for each route inside router and second is router object 
app.use('/books', booksRoute);


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