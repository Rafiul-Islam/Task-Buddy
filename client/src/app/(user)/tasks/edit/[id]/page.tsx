"use client";

import React from "react";
import {useParams, useRouter} from "next/navigation";
import EditTaskHeader from "./components/EditTaskHeader";
import EditTaskForm from "./components/EditTaskForm";
import {useTasks} from "@/hooks/useTasks";
import {Button} from "@/components/ui/button";
import {Task} from "@/types/task";

const EditTaskPage = () => {
  const params = useParams();
  const taskId = params.id as string;

  const router = useRouter();
  const {useTask} = useTasks();
  const {data:task, isLoading, error} = useTask(+taskId);

  console.log("EditTaskPage - params:", params);
  console.log("EditTaskPage - taskId:", taskId);

  if (isLoading) return <div>Loading...</div>;
  if (error)
  if (error) {
    return (
      <div className="min-h-screen p-8 space-y-4">
        <div className='text-red-600'>{error.message}</div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto px-4">
        <EditTaskHeader />
        <EditTaskForm task={task || {} as Task} />
      </div>
    </div>
  );
};

export default EditTaskPage;
