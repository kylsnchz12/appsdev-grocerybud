import { useState } from 'react'
import './App.css'
import List from './List';

function App() {

  return (
    <div className='container'>
      <form className='grocery-form'>
        <h3 className='grocery-h3'>Grocery Bud</h3>
        <div className='div-form'>
          <input 
            placeholder='e.g. eggs'
            className='input-grocery'
          />
          <button className='btn'>Submit</button>
        </div>
      </form>
      <List />
    </div>
  )
}

export default App
