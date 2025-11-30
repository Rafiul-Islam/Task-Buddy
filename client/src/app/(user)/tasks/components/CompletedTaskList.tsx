import {Task, TaskComponentProps} from "@/types/task";
import TaskCard from "@/app/(user)/tasks/components/TaskCard";

const CompletedTaskList = (props: TaskComponentProps) => {
  const {tasks} = props;

  return (
    <div className="bg-green-200 rounded shadow px-4 py-6">
      <h2 className="text-lg font-medium text-center italic">Completed Tasks</h2>
      <div className='space-y-2 mt-5 max-h-[55vh] overflow-y-auto'>
        {tasks.filter((task) => task.status === 'COMPLETED').map((task) => (
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  );
};

export default CompletedTaskList;