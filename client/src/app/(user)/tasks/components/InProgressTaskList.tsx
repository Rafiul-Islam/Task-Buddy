import {Task, TaskComponentProps} from "@/types/task";
import TaskCard from "@/app/(user)/tasks/components/TaskCard";

const InProgressTaskList = (props: TaskComponentProps) => {
  const {tasks} = props;

  return (
    <div className="bg-orange-200 rounded shadow px-4 py-6">
      <h2 className="text-lg font-medium text-center italic">TODO Tasks</h2>
      <div className='space-y-2 mt-5 max-h-[55vh] overflow-y-auto'>
        {tasks.filter((task) => task.status === 'IN_PROGRESS').map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};

export default InProgressTaskList;