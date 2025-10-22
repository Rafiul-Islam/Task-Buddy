"use client";

import {fetcher} from "@/lib/fetcher";
import {API} from "@/lib/api";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {TaskType} from "@/types/task";
import {ApiResponseType} from "@/types/auth";

const UseTasks = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetcher<ApiResponseType<TaskType[]>>(API.TASK.GET.ALL),
  });

  const invalidateTasks = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  }

  return {
    ...query,
    invalidateTasks,
  }
};

export default UseTasks;