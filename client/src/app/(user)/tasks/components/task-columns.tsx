"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TaskType } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const taskColumns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const color =
        priority === "HIGH"
          ? "text-red-600"
          : priority === "MEDIUM"
            ? "text-yellow-600"
            : "text-green-600";
      return <span className={color}>{priority}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => console.log("Edit:", task.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => console.log("Delete:", task.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];