import {useMutation} from "@tanstack/react-query";
import {ValidateTokenFormData} from "@/schemas/authValidationSchema";
import {httpClient} from "@/lib/http-client";
import {ApiResponse} from "@/types/auth";
import {toast} from "react-toastify";

interface ResetPasswordParams {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

const UseResetPassword = () => {

  const validateToken = useMutation({
    mutationFn: async (data: ValidateTokenFormData) => {
      const res = await httpClient.post<ApiResponse<void>>("/auth/validate-reset-password-link", data, {validateStatus: () => true})
      .then(res => res.data);
      if (!res.success) throw {message: res.message};
      return res;
    },
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data: ResetPasswordParams) => {
      const res = await httpClient.post<ApiResponse<void>>("/auth/reset-password", data, {validateStatus: () => true})
      .then(res => res.data);
      if (!res.success) throw {message: res.message};
      return res;
    },
    onSuccess: () => {
      toast.success("Password reset successfully")
    },
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
  });

  return {
    validateToken,
    resetPassword,
  };
};

export default UseResetPassword;