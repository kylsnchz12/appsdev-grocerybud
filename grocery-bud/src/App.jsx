import { useState } from 'react'
import './App.css'
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list){
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      alert('Input a value')
    }else if(name && isEditing){
      {/* TODO: map out the updated list, set isediting to false, show alert*/}
    }
  }
  return (
    <div className='container'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3 className='grocery-h3'>Grocery Bud</h3>
        <div className='div-form'>
          <input 
            placeholder='e.g. eggs'
            className='input-grocery'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='btn' type='submit'>
            {isEditing ? "Edit" : "Submit"}
            </button>
        </div>
      </form>
      <div className='contianer'>
          <List />
      </div>
    </div>
  )
}

export default App
