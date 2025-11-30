import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/taskService";
import CACHE_KEYS from "@/constants/cache-keys";
import { Task } from "@/types/task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasks = useQuery({
    queryKey: [CACHE_KEYS.TASKS],
    queryFn: taskService.getAll,
  });

  const useTask = (id: number) =>
    useQuery({
      queryKey: [CACHE_KEYS.TASKS, id],
      queryFn: () => taskService.getOne(id),
    });

  const createTask = useMutation({
    mutationFn: (newTask: Task) => taskService.post(newTask),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEYS.TASKS] });
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) => [
        newTask,
        ...old,
      ]);
      return { previous };
    },
    onSuccess: (savedTask, newTask) => {
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t === newTask ? savedTask : t))
      );
    },
    onError: (err, newTask, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
    },
  });

  const updateTask = useMutation({
    mutationFn: (task: Task) => taskService.put(task.id, task),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEYS.TASKS] });
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      return { previous };
    },
    onSuccess: (saved, updatedTask) => {
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? saved : t))
      );
    },
    onError: (err, updatedTask, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => taskService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [CACHE_KEYS.TASKS] });
      const previous = queryClient.getQueryData<Task[]>([CACHE_KEYS.TASKS]);
      queryClient.setQueryData<Task[]>([CACHE_KEYS.TASKS], (old = []) =>
        old.filter((t) => t.id !== id)
      );
      return { previous };
    },
    onError: (err, id, ctx) => {
      queryClient.setQueryData([CACHE_KEYS.TASKS], ctx?.previous);
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