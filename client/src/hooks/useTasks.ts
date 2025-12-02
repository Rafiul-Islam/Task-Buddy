import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import taskService from "@/services/taskService";
import CACHE_KEYS from "@/constants/cache-keys";
import {Task} from "@/types/task";
import {toast} from "react-toastify";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasks = useQuery({
    queryKey: [CACHE_KEYS.TASKS],
    queryFn: async () => {
      const res = await taskService.getAll();
      if (!res.success) throw {message: res.message};
      return res.payload;
    },
  });

  const useTask = (id: number) => useQuery({
    queryKey: [CACHE_KEYS.TASKS, id],
    queryFn: async () => {
      const res = await taskService.getOne(id);
      if (!res.success) throw {message: res.message};
      return res.payload;
    },
  });

  const createTask = useMutation({
    mutationFn: async (newTask: Task) => {
      const res = await taskService.post(newTask);
      if (!res.success) throw {message: res.message};
      return res.payload;
    },
    onMutate: async (newTask) => {
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) => [
        newTask,
        ...old,
      ]);
      return {previous};
    },
    onSuccess: (savedTask, newTask) => {
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t === newTask ? savedTask : t))
      );
      toast.success("Task created successfully");
    },
    onError: (err, newTask, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
      toast.error("Failed to create task");
      console.log("createTask - onError - err:", err);
    },
  });

  const updateTask = useMutation({
    mutationFn: async (task: Task) => {
      const res = await taskService.put(task.id, task);
      if (!res.success) throw {message: res.message};
      return res.payload;
    },
    onMutate: async (updatedTask) => {
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      return {previous};
    },
    onSuccess: (savedTask, updatedTask) => {
      queryClient.setQueryData<Task>([CACHE_KEYS.TASKS, updatedTask.id], savedTask);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? savedTask : t))
      );
      toast.success("Task updated successfully");
    },
    onError: (err, updatedTask, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
      toast.error("Failed to update task");
      console.log("updateTask - onError - err:", err);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => taskService.delete(id),
    onMutate: async (id) => {
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.filter((t) => t.id !== id)
      );
      toast.success("Task deleted successfully");
      return {previous};
    },
    onError: (err, id, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
      toast.error("Failed to delete task");
      console.log("deleteTask - onError - err:", err);
    },
  });

  return {
    tasks,
    useTask,
    createTask,
    updateTask,
    deleteTask,
  };
};