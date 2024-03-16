import { useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

useEffect(()=>{
      let todoString= localStorage.getItem("todos")
      if(todoString>0){
          let todos = JSON.stringify(localStorage.getItem("todos"))
          setTodos(todos)
      }
  }, [])

  const saveToLS = (params)=>{
    localStorage.setItem("todos",JSON.stringify("todos"))
  }

  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos,{id: uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleEdit = (e,id) => {
   let todo=todos.filter(i=>i.id===id)
    setTodo(todo[0].todo)
    let newTodos = todos.filter(
      item=>{
        return item.id!==id
      }
     )
     setTodos(newTodos)
     saveToLS()
   }
  const handleDelete = (e,id) => { 
  
   let newTodos = todos.filter(
    item=>{
      return item.id!==id
    }
   )
   setTodos(newTodos)
   saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => { 
   let id= e.target.name
   let index= todos.findIndex(item=>{
      return item.id===id
   })
   let newTodos = [...todos]
   newTodos[index].isCompleted = !newTodos[index].isCompleted
   setTodos(newTodos)
   SaveToLS()
  }




  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-purple-200 min-h-screen w-3/4">
        <div className="addTodo">
          <h1 className="text-lg font-bold">Add a Todo</h1>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full py-1" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-700 hover:bg-purple-900 p-4 py-2 font-bold text-white rounded-md mx-2 rounded-full my-4 ">
            Save
          </button>
        </div>
        <input className="my-4" type="checkbox" checked={showFinished} onChange ={toggleFinished} id="show"/>
        <label className="mx-2" htmlFor='show' >Show Finished</label>
        <div className="bg-black opacity-15 w-[90%] h-[1px] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Todos to be display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) &&<div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""/>
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className="bg-violet-700 hover:bg-violet-900 p-4 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
                <button onClick={(e)=>handleDelete(e,item.id)} className="bg-violet-700 hover:bg-violet-900 p-4 py-1 text-sm font-bold text-white rounded-md mx-1">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
