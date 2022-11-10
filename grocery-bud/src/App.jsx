import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("")
  const [editId, setEditId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      alert('Input a value');
    }else if(name && isEditing){
      setList(
        list.map((item) => {
          if(item.id == editId){
            return {...item, title: name}
          }
          return item
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      alert('changed');
    }else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      alert(`added a value ${name}`);
    }
  }

  const editItem = (id) => {
    const thisItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditId(id);
    setName(thisItem.title); 
  }

  const removeItem = (id) => {
    setList(
      list.filter((item) => item.id != id));
  }

  const clearList = () => {
    setList([]);
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

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
      <List items = {list} editItem = {editItem} removeItem = {removeItem}/>
      <button 
        className='clear-btn'
        type='button'
        onClick={clearList}
        
      >
          Clear List
      </button>
    </div>
  )
}

export default App
