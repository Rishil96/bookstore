import express from 'express';
import { PORT } from './config.js';

const app = express();

// Start the HTTP Server and takes port number and host optionally on which the server will be available on
/* 
    Port: A number representing the port on which the server should listen (e.g., 3000).
    Hostname (optional): A string representing the hostname or IP address to bind to (default is localhost or 0.0.0.0).
    Callback (optional): A function to execute once the server starts listening for requests.
*/
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});