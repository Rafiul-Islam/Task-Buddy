import React from 'react';
import TaskView from "@/app/(user)/tasks/components/TaskView";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <Link href="/tasks/add">
          <Button variant="success" size="default">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </Link>
      </div>
      <TaskView/>
    </div>
  );
};

export default Tasks;