import { useState, useEffect } from 'react'
import Task from './Components/Task.jsx'
import {DragDropProvider} from '@dnd-kit/react'
import Column from './Components/column.jsx'
function App() {

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState([]) 
  const [doneTasks, setDoneTasks] = useState([])
  const [target, setTarget] = useState("TO DO")


  const addTask = () => {
    if (input.trim() === "") return
    let taskObject = {name: input.trim(), column: "TO DO"}
    setTasks([...tasks, taskObject])
    setInput("")
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const editTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? {...task, name: newText} : task
      )
    )
  }

  const moveToDone = (index) => {
    const task = tasks[index] 

    setDoneTasks([...doneTasks, task.name])
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const editColumn = (index, newColumn) => {

    setTasks(
      tasks.map((task, i) =>
      i === index ? {...task, column: newColumn} : task
    ))
  }

  // const useEffect((index) => {
  //   editColumn(index, target)

  // },[target])



  const columns = ["TO DO", "IN PROGRESS", "DONE"]
  return (
    
    <section className="flex flex-col w-full h-full bg-white items-center p-5 gap-5 rounded-2xl">



      <h1 className="text-3xl  font-bold">TO DO LIST</h1>
      <div>
        <input id="input" type="text"

          value={input}
          onChange={(e) => setInput(e.target.value)}

          onMouseOver={(e) => { e.target.placeholder = "" }} onMouseLeave={(e) => { e.target.placeholder = "Enter your task here" }}

          placeholder="Enter your task here"

          className=" h-10  border-2 border-black rounded-l-md  text-center" />

        <button onClick={addTask} className="bg-black text-white border border-black rounded-r-md  h-10 w-20 font-bold">Add</button>

      </div>



      <div className="grid grid-cols-3 gap-20 h-full w-full">

        <DragDropProvider
          onDragEnd={(event) => {
          if(event.canceled) return;

          const {target} = event.operation
          setTarget(target.id)
        }}
        
        >
      {columns.map((column, index) => (
        <Column key={index} id={column}>

          {tasks.map((task, index) => {
            return (
              column === task.column && <Task
              key={index}
              task={task.name}
              deleteTask={() => deleteTask(index)}
              editTask={(newText) => editTask(index, newText)}
              doneTask={() => moveToDone(index)}
            />
          )
          })}
          {doneTasks.map((task, index) => (
            <Task key={index} task={task} isDone={true} deleteTask={() => {
              setDoneTasks(doneTasks.filter((_, i) => i !== index))
            }}
            />
          ))}

        </Column>
      ))}
      </DragDropProvider>

      </div>
    </section>
  )
}


export default App