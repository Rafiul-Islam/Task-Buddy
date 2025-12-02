"use client"

import {Task} from "@/types/task";
import {Pencil, Trash} from "lucide-react";
import {confirmDelete} from "@/components/ConfirmationDialog";
import {useRouter} from "next/navigation";

interface Props {
  task: Task,
  onDelete: (id:number) => void
}

const TaskCard = ({task, onDelete}: Props) => {
  const {id, title, description, priority} = task;

  const router = useRouter();

  const handleDelete = async () => {
    const result = await confirmDelete();
    if (result?.isConfirmed) onDelete(id);
  }

  return (
    <div className={`bg-white rounded shadow-lg p-5`}>
      <h3 className="text-lg font-medium capitalize">{title}</h3>
      <p className="text-sm italic text-gray-600">{description}</p>
      <div
        className={`mt-1 inline-block px-4 py-2 rounded-full text-xs font-medium capitalize text-white ${priority === 'HIGH' ? 'bg-red-700' : priority === 'MEDIUM' ? 'bg-yellow-700' : 'bg-green-700'}`}>
        {priority}
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => router.push(`/tasks/edit/${id}`)}
          className="bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-500  h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition duration-200">
          <Pencil size={19}/>
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-100 hover:bg-red-600 hover:text-white text-red-500  h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition duration-200">
          <Trash size={20}/>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;