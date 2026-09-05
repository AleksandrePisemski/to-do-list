import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useDraggable } from '@dnd-kit/react'











export default function Task({ task, deleteTask, editTask, doneTask }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.name)
    const { ref } = useDraggable({
        id: task.id,
    });






    function handleSave() {
        editTask(editText)
        setIsEditing(false)
    }

    function handleEdit() {
        setIsEditing(true)
    }

    return (
        <div className="flex items-center border-2 rounded-lg border-gray-500 p-2 justify-between" ref={ref}>

            {isEditing ? (
                <input
                    className='w-1/3'
                    value={editText}
                    onChange={e =>  setEditText(e.target.value)}
                />
            ) : (
                <h1 className="max-w-1/3 overflow-x-auto">{task.name}</h1>
            )}



            <div className="flex gap-5">
                {!(task.column === "DONE") && (
                    <>
                        {isEditing ? (
                            <button onClick={handleSave} className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold">Save</button>)
                            :
                            (
                                <button onClick={handleEdit} className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold">Edit</button>)
                        }



                        <button
                            onClick={doneTask}
                            className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold"
                        >Done
                        </button>

                    </>
                )}



                <button onClick={deleteTask} className="p-2 aspect-square h-10">
                    <TrashIcon className="h-6 w-6" />
                </button>
            </div>

        </div>
    )

}