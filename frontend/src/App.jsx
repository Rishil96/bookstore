import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import CreateBook from './pages/CreateBooks'; 
import EditBook from './pages/EditBook'; 
import ShowBook from './pages/ShowBook'; 
import DeleteBook from './pages/DeleteBook'; 


const App = () => {
  return (
    /*
      Routes is a container that holds all routes
      Route is a single path/URL linked with a component that will be displayed when we go to that path via some event (e.g. clicking a button, etc)
    */
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App
