import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useDraggable } from '@dnd-kit/react'

export function TaskUI({ task, deleteTask, editTask, doneTask, isDragging, isOverlay }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.name)

    function handleSave() {
        editTask(editText)
        setIsEditing(false)
    }

    function handleEdit() {
        setIsEditing(true)
    }

    return (
        <div
            className={`flex flex-col md:flex-row md:items-center border-2 rounded-lg border-gray-500 p-2 justify-between gap-2 md:gap-0 bg-white ${
                isOverlay ? 'shadow-2xl opacity-100 cursor-grabbing' : ''
            } ${
                isDragging ? 'opacity-60 blur-[1px] border-gray-300' : ''
            }`}
        >
            {isEditing ? (
                <input
                    className="w-full md:w-1/3 min-w-0 border border-gray-400 rounded px-2 h-8"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                />
            ) : (
                <h1 className="flex-1 min-w-0 md:max-w-1/3 overflow-x-auto">
                    {task.name}
                </h1>
            )}

            <div className="flex gap-2 md:gap-5 shrink-0">
                {!(task.column === "DONE") && (
                    <>
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleEdit}
                                className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold"
                            >
                                Edit
                            </button>
                        )}

                        <button
                            onClick={doneTask}
                            className="text-black border border-gray-500 rounded-lg h-10 w-15 font-bold"
                        >
                            Done
                        </button>
                    </>
                )}

                <button
                    onClick={deleteTask}
                    className="p-2 aspect-square h-10"
                >
                    <TrashIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

export default function Task(props) {
    const { ref, isDragging } = useDraggable({
        id: props.task.id,
    })

    return (
        <div ref={ref}>
            <TaskUI {...props} isDragging={isDragging} />
        </div>
    )
}