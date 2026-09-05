import {useDroppable} from '@dnd-kit/react'
const Column = ({ id, children }) => {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref} className="flex flex-col min-w-100 overflow-x-auto min-h-100 max-h-screen  border-black rounded-lg border-2  bg-white p-2 gap-3">
        <h1 className="text-center font-bold text-xl underline underline-offset-4">{id}</h1>
      {children}
    </div>
  );

}

export default Column