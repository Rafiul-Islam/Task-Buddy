import {Task} from "@/types/task";

interface Props {
  task: Task
}

const TaskCard = ({task}: Props) => {
  const {title, description, priority} = task;
  return (
    <div className={`bg-white rounded shadow-lg p-5`}>
      <h3 className="text-lg font-medium capitalize">{title}</h3>
      <p className="text-sm italic text-gray-600">{description}</p>
      <div className={`mt-1 inline-block px-4 py-2 rounded-full text-xs font-medium capitalize text-white ${priority === 'HIGH' ? 'bg-red-700' : priority === 'MEDIUM' ? 'bg-yellow-700' : 'bg-green-700'}`}>
        {priority}
      </div>
    </div>
  );
};

export default TaskCard;