import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {updateUserFormData} from "@/schemas/userSchema";

export const useUser = () => {
  const {data: session, status} = useSession();

  const userObj = {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };

  const updateInfo = useMutation({
    mutationFn: async (data: updateUserFormData) => {
      console.log(data)
    },
    onSuccess: () => {
      console.log("User updated successfully")
    },
    onError: () => {
      console.log("User update failed")
    },
  });

  return {
    userObj,
    updateInfo
  }
}