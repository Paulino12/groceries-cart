import React from 'react'
import Navbar from './components/Navbar'
import './App.css'
import SearchGroceriesForm from './components/SearchGroceriesForm'
import Cart from './components/Cart'

function App() {
  return (
    <div className='h-screen bg-slate-100'>
      <Navbar />
      {/* form component */}
      <SearchGroceriesForm />
      <Cart />
    </div>
  );
}

export default App;
