"use client";

import React from "react";
import { useParams } from "next/navigation";
import EditTaskHeader from "./components/EditTaskHeader";
import EditTaskForm from "./components/EditTaskForm";

const EditTaskPage = () => {
  const params = useParams();
  const taskId = params.id as string;

  console.log("EditTaskPage - params:", params);
  console.log("EditTaskPage - taskId:", taskId);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto px-4">
        <EditTaskHeader />
        <EditTaskForm />
      </div>
    </div>
  );
};

export default EditTaskPage;
