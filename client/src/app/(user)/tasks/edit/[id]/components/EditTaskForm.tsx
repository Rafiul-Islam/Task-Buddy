"use client";

import {PriorityType, StatusType, TASK_PRIORITIES, TASK_STATUSES} from "@/constants/task";
import {Task} from "@/types/task";
import {useTasks} from "@/hooks/useTasks";
import {useForm} from "react-hook-form";
import {TaskAddFormData, taskSchema} from "@/schemas/taskSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextAreaField";
import {DropdownField} from "@/components/DropdownField";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";

interface Props {
  task: Task;
}

const taskPriorities = Object.values(TASK_PRIORITIES);
const taskStatuses = Object.values(TASK_STATUSES);

const EditTaskForm = ({task}: Props) => {

  const router = useRouter();
  const {updateTask} = useTasks();
  const {mutate, isPending} = updateTask;

  const {register, handleSubmit, formState: {errors}, reset, setValue, watch} = useForm<TaskAddFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    }
  });

  const onSubmit = (data: TaskAddFormData) => {
    mutate({id: task.id, ...data});
    reset();
    setValue("priority", "LOW");
    setValue("status", "TODO");
    router.push("/tasks");
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
          value={watch("priority")}
          onChange={(value) => setValue("priority", value as PriorityType)}
          error={errors.priority}
        />
        <DropdownField
          label="Task Status"
          options={taskStatuses}
          value={watch("status")}
          onChange={(value) => setValue("status", value as StatusType)}
          error={errors.status}
        />
        <SubmitButton
          className='w-full'
          variant="primary"
          size="lg"
          label='Submit'
          processingLabel="Submitting..."
          loading={isPending}
          disabled={isPending}
        />
      </form>
    </div>
  );
};

export default EditTaskForm;