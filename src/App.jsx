import { useState } from 'react'
import Task from './Components/Task.jsx'

// что добавила иишка


function test(){
}

test()



function App() {

  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState([]) 
  const [doneTasks, setDoneTasks] = useState([])

  const addTask = () => {
    if (input.trim() === "") return
    
    setTasks([...tasks, input]) //tasks = [...tasks,input] 
    setInput("")
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const editTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? newText : task
      )
    )
  }

  const moveToDone = (index) => {
    const task = tasks[index] 

    setDoneTasks([...doneTasks, task])
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (

    // что добавила иишка

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



        <div className="flex flex-col  h-full border-black rounded-lg border-2  bg-white p-2 gap-3 ">
          <h1 className="text-center font-bold text-xl underline underline-offset-4">TO DO</h1>

          {/* добавила иишка */}


          {tasks.map((task, index) => (
            <Task
              key={index} //key should be unique for each element in the array
              task={task} //task1
              deleteTask={() => deleteTask(index)}
              editTask={(newText) => editTask(index, newText)}
              doneTask={() => moveToDone(index)}
            />
          ))}

          {/* добавила иишка */}



        </div>

        <div className="flex flex-col  h-full border-black rounded-lg border-2  bg-white p-2 gap-3">
          <h1 className="text-center font-bold text-xl underline underline-offset-4">IN PROGRESS</h1>
        </div>

        <div className="flex flex-col  h-full border-black rounded-lg border-2  bg-white p-2 gap-3">
          <h1 className="text-center font-bold text-xl underline underline-offset-4">DONE</h1>

          {/* добавила иишка */}
          {doneTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              isDone={true}
              deleteTask={() => {
                setDoneTasks(doneTasks.filter((_, i) => i !== index))
              }}
            />
          ))}
          {/* добавила иишка */}
        </div>


      </div>







    </section>
  )
}


export default App