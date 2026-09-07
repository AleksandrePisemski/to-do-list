import { useDroppable } from '@dnd-kit/react'

const Column = ({ id, children }) => {

  const { ref } = useDroppable({
    id,
  })

  return (
    <div
      ref={ref}
      className="flex flex-col w-full md:min-w-100 min-h-40 md:min-h-100 max-h-none md:max-h-screen overflow-x-auto border-black rounded-lg border-2  bg-white p-2 gap-3"
      
    >

      <h1 className="text-center font-bold text-xl underline underline-offset-4">
        {id}
      </h1>

      {children}

    </div>
  )
}

export default Column