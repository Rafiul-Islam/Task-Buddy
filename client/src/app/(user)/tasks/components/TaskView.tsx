"use client"

import React from 'react';
import useTasks from "@/hooks/useTasks";
import Loader from "@/components/Loader";
import {TaskTable} from "@/app/(user)/tasks/components/TaskTable";
import {taskColumns} from "@/app/(user)/tasks/components/task-columns";

export const TaskView = () => {
  const {isLoading, data, error} = useTasks();

  const dataLength = data?.payload?.length ?? 0;

  if(isLoading) return <Loader fullScreen/>;
  if(error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {dataLength === 0 && <div>No tasks found</div>}
      {dataLength > 0 && <TaskTable columns={taskColumns} data={data?.payload || []}/>}
    </div>
  );
};