import {ApiClient} from "@/lib/http-client";
import {User} from "@/types/user";

const userService = new ApiClient<User>("/user")

export default userService;