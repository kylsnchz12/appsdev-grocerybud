import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
import List from "./List";
import Alert from "./Alert"

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
  const [style, setStyle] = useState("")
  const [msg, setMsg] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      setStyle('red')
      setMsg('Please enter value')
      setShowAlert(true)
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
      setStyle('green')
      setMsg('Value changed')
      setShowAlert(true)
    }else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      setStyle('green')
      setMsg('Item added to the list')
      setShowAlert(true)
    }
  }

  const editItem = (id) => {
    const thisItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditId(id);
    setName(thisItem.title); 
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id != id));
    setStyle('red')
    setMsg('Item removed')
    setShowAlert(true)
  }

  const clearList = () => {
    setList([]);
    setStyle('red')
    setMsg('List cleared')
    setShowAlert(true)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 2000);
    return () => clearTimeout(timer);
  }, [list]);

  return (
    <div className='container'>
      <form className='grocery-form' onSubmit={handleSubmit}>

        {showAlert && <Alert style={style} msg={msg} />}

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
