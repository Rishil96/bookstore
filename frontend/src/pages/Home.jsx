import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';


const Home = () => {
  
  // States 
  // Books state will hold the list of books that we receive from backend
  const [books, setBooks] = useState([]);
  // Loading state holds a boolean as when loading is true we display a widget of loading icon instead of blank screen
  const [loading, setLoading] = useState(false);
  // Show type state
  const [showType, setShowType] = useState('table');

  // Use Effect will run when we initially visit the route and load all the books in the database and set the list of values in usestate
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
    .then((response) => {
      setBooks(response.data.data);
      setLoading(false);
    })
    .catch ((error) => {
      console.log(error);
      setLoading(false);
    })
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => {setShowType('table')}}>
          Table
        </button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => {setShowType('card')}}>
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3x1 my-8'>Books List</h1>
        {/* Link Box with +icon to create a new book */}
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4x1' />
        </Link>
      </div>
      {/* If loading is true display spinner or else display our books table */}
      { loading ? (
        <Spinner />
      ) : (
        showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books}/>)
      )
      }
    </div>
  )
}

export default Home;
