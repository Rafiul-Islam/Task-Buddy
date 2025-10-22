"use client";

import React from 'react';
import useTasks from "@/hooks/useTasks";
import Loader from "@/components/Loader";

const TaskTable = () => {
  const {isLoading, data, error} = useTasks();
  console.log(data?.payload);

  if(isLoading) return <Loader fullScreen/>;
  if(error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.payload.length === 0 && <div>No tasks found</div>}
    </div>
  );
};

export default TaskTable;