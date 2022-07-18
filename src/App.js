import React from 'react'
import Navbar from './components/Navbar'
import './App.css'
import SearchGroceriesForm from './components/SearchGroceriesForm'
import Cart from './components/Cart'
import PaginationAlgo from './components/algos/PaginationAlgo'

function App() {
  return (
    <div className='min-h-screen bg-slate-100'>
      <Navbar />
      <SearchGroceriesForm />
      <Cart />
      {/* <PaginationAlgo /> */}
    </div>
  );
}

export default App;
