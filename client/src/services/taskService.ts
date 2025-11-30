import {ApiClient} from "@/lib/http-client";
import {Task} from "@/types/task";

const taskService = new ApiClient<Task>("/tasks")

export default taskService;