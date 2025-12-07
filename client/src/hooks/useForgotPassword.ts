import {useMutation} from "@tanstack/react-query";
import {httpClient} from "@/lib/http-client";
import {ApiResponse} from "@/types/auth";
import {toast} from "react-toastify";
import {ForgotPasswordFormData} from "@/schemas/authValidationSchema";

const UseForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      const res = await httpClient.post<ApiResponse<void>>("/auth/forgot-password", data, {validateStatus: () => true})
      .then(res => res.data);
      if (!res.success) throw {message: res.message};
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error);
    }
  });
};

export default UseForgotPassword;