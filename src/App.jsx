import { useState, useEffect } from 'react'
import Task, { TaskUI } from './Components/Task.jsx'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import Column from './Components/column.jsx'
import { createPortal } from 'react-dom'

function App() {

  const columns = ["TO DO", "IN PROGRESS", "DONE"]

  const [input, setInput] = useState("")
  const [activeTask, setActiveTask] = useState(null)

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

    let taskObject = {
      id: crypto.randomUUID(),
      name: formatedInput,
      column: "TO DO"
    }

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
      )
    )
  }

  return (

    <section className="flex flex-col w-full min-h-full bg-white items-center p-5 gap-5 rounded-2xl">

      <h1 className="text-3xl font-bold">
        TO DO LIST
      </h1>

      <div className="flex w-full justify-center">

        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onMouseOver={(e) => {
            e.target.placeholder = ""
          }}
          onMouseLeave={(e) => {
            e.target.placeholder = "Enter your task here"
          }}
          placeholder="Enter your task here"
          className="h-10 border-2 border-black rounded-l-md text-center w-full max-w-100"
        />

        <button
          onClick={addTask}
          className="bg-black text-white border border-black rounded-r-md h-10 w-20 font-bold shrink-0"
        >
          Add
        </button>

      </div>

      <div className="flex md:flex-row flex-col justify-center gap-3 md:gap-20 w-full">

        <DragDropProvider
          onDragStart={(event) => {
            const { source } = event.operation
            if (source && source.id) {
              const task = tasks.find(t => t.id === source.id)
              if (task) setActiveTask(task)
            }
          }}
          onDragEnd={(event) => {
            setActiveTask(null)

            if (event.canceled) return

            const { target, source } = event.operation

            if (!target || !source) return

            let newColumn = target.id
            let taskid = source.id

            editColumn(taskid, newColumn)
          }}
        >

          {columns.map((column, index) => (

            <Column key={index} id={column}>

              {tasks.map((task) => {

                return (
                  column === task.column &&
                  <Task
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

          {createPortal(
            <DragOverlay dropAnimation={null}>
              {activeTask ? (
                <TaskUI
                  task={activeTask}
                  isOverlay={true}
                  deleteTask={() => {}}
                  editTask={() => {}}
                  doneTask={() => {}}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}

        </DragDropProvider>

      </div>

    </section>
  )
}

export default App