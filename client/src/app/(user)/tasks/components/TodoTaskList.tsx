import {TaskComponentProps} from "@/types/task";
import TaskCard from "@/app/(user)/tasks/components/TaskCard";

const TodoTaskList = (props: TaskComponentProps) => {
  const {tasks, onDelete} = props;

  return (
    <div className="bg-blue-200 rounded shadow px-4 py-6">
      <h2 className="text-lg font-medium text-center italic">TODO Tasks</h2>
      <div className='space-y-2 mt-5 max-h-[55vh] overflow-y-auto'>
        {tasks.filter((task) => task.status === 'TODO').map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete}/>
        ))}
      </div>
    </div>
  );
};

export default TodoTaskList;