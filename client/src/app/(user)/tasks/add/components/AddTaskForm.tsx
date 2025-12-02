"use client";

import {useForm} from "react-hook-form";
import {TaskAddFormData, taskSchema} from "@/schemas/taskSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextAreaField";
import SubmitButton from "@/components/SubmitButton";
import {DropdownField} from "@/components/DropdownField";
import {PriorityType, StatusType, TASK_PRIORITIES, TASK_STATUSES} from "@/constants/task";
import {useTasks} from "@/hooks/useTasks";

const taskPriorities = Object.values(TASK_PRIORITIES);
const taskStatuses = Object.values(TASK_STATUSES);

const AddTaskForm = () => {

  const {createTask} = useTasks();


  const {register, handleSubmit, formState: {errors, isLoading}, reset, setValue, getValues} = useForm<TaskAddFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskAddFormData) => {
    createTask.mutate({id: 0, ...data});
    reset();
    setValue("priority", "LOW");
    setValue("status", "TODO");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          title="Task Title"
          inputProps={{
            type: "text",
            placeholder: "Enter task title here...",
            ...register("title")
          }}
          error={errors.title}
        />
        <TextareaField
          title="Task Description"
          textareaProps={{
            placeholder: "Enter task description here...",
            ...register("description")
          }}
          error={errors.description}
        />
        <DropdownField
          label="Task Priority"
          options={taskPriorities}
          value={getValues("priority")}
          onChange={(value) => setValue("priority", value as PriorityType)}
          error={errors.priority}
        />
        <DropdownField
          label="Task Status"
          options={taskStatuses}
          value={getValues("status")}
          onChange={(value) => setValue("status", value as StatusType)}
          error={errors.status}
        />
        <SubmitButton
          className='w-full'
          variant="primary"
          size="lg"
          label='Submit'
          processingLabel="Submitting..."
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default AddTaskForm;