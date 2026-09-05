import { useState, useEffect } from 'react'
import Task from './Components/Task.jsx'
import { DragDropProvider } from '@dnd-kit/react'
import Column from './Components/column.jsx'



function App() {




  const columns = ["TO DO", "IN PROGRESS", "DONE"]
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  const addTask = () => {
    let formatedInput = input.trim()
    if (formatedInput === "") return
    let taskObject = { id: crypto.randomUUID(), name: formatedInput, column: "TO DO" }
    setTasks([...tasks, taskObject])
    setInput("")
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: newText } : task
      )
    )
  }

  const editColumn = (id, newColumn) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, column: newColumn } : task
      ))
  }



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



      <div className="flex md:flex-row flex-col justify-center gap-3 md:gap-20 h-full ">

        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;
            const { target, source } = event.operation
            if (!target || !source) return;
            let newColumn = target.id
            let taskid = source.id
            editColumn(taskid, newColumn)
          }}

        >
          {columns.map((column, index) => (
            <Column key={index} id={column}>

              {tasks.map((task) => {
                return (
                  column === task.column && <Task
                    key={task.id}
                    task={task}
                    deleteTask={() => deleteTask(task.id)}
                    editTask={(newText) => editTask(task.id, newText)}
                    doneTask={() => editColumn(task.id, "DONE")}
                  />
                )
              })}

            </Column>
          ))}
        </DragDropProvider>

      </div>
    </section>
  )
}


export default App