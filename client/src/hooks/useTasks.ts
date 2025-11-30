import {useQuery} from "@tanstack/react-query";
import taskService from "@/services/taskService";
import CACHE_KEYS from "@/constants/cache-keys";

const UseTasks = () => {
  return useQuery({
    queryKey: [CACHE_KEYS.TASKS],
    queryFn: taskService.getAll
  })
};

export default UseTasks;