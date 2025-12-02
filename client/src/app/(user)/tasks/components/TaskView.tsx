"use client";

import {useTasks} from "@/hooks/useTasks";
import TodoTaskList from "@/app/(user)/tasks/components/TodoTaskList";
import InProgressTaskList from "@/app/(user)/tasks/components/InProgressTaskList";
import CompletedTaskList from "@/app/(user)/tasks/components/CompletedTaskList";

const TaskView = () => {
  const {tasks: {data: tasks, isLoading, error}, deleteTask} = useTasks();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      <TodoTaskList
        tasks={tasks || []}
        onDelete={deleteTask.mutate}
      />
      <InProgressTaskList
        tasks={tasks || []}
        onDelete={deleteTask.mutate}
      />
      <CompletedTaskList
        tasks={tasks || []}
        onDelete={deleteTask.mutate}
      />
    </div>
  );
};

export default TaskView;