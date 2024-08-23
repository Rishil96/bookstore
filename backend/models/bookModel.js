import mongoose, { mongo } from "mongoose";

// Schema is the structure that each document must obey to be in the collection
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

// Mongoose model that will represent the MongoDB table/collection inside JS code
export const Book = mongoose.model('Book', bookSchema);