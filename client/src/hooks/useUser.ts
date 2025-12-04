import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {updateUserFormData} from "@/schemas/userSchema";
import {httpClient} from "@/lib/http-client";
import {ApiResponse} from "@/types/auth";
import {User} from "@/types/user";
import {toast} from "react-toastify";

export const useUser = () => {
  const {data: session, status, update} = useSession();

  const userObj = {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };

  const updateInfo = useMutation({
    mutationFn: async (data: updateUserFormData) => {
      const response = await httpClient.put<ApiResponse<User>>(`/user/${userObj.user?.userId}`, data, {validateStatus: () => true})
      .then(res => res.data);
      if (!response.success) throw {message: response.message};
      return response.payload;
    },
    onSuccess: async (savedUser) => {
      await update({user: savedUser});
      console.log(savedUser);
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const changePassword = useMutation({
    mutationFn: async (data: {oldPassword: string, newPassword: string}) => {
      const response = await httpClient.post<ApiResponse<User>>(`/user/${userObj.user?.userId}/change-password`, data, {validateStatus: () => true})
      .then(res => res.data);
      if (!response.success) throw {message: response.message};
      return response.payload;
    },
    onSuccess: async () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  })

  return {
    userObj,
    updateInfo,
    changePassword
  }
}