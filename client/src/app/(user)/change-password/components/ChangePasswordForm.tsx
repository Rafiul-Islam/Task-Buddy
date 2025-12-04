"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {changeUserPasswordFormData, changeUserPasswordSchema} from "@/schemas/userSchema";
import SubmitButton from "@/components/SubmitButton";
import PasswordInputField from "@/components/PasswordInputField";
import {useUser} from "@/hooks/useUser";

const ChangePasswordForm = () => {

  const {changePassword} = useUser();
  const {mutate, isPending} = changePassword;

  const {register, handleSubmit, formState: {errors}, reset} = useForm<changeUserPasswordFormData>({
    resolver: zodResolver(changeUserPasswordSchema),
  })

  const onSubmit = (data: changeUserPasswordFormData) => {
    mutate({oldPassword: data.oldPassword, newPassword: data.newPassword}, {
      onSuccess: () => {
        reset();
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInputField
          title='Old Password'
          inputProps={{
            ...register('oldPassword'),
          }}
          error={errors.oldPassword}
        />
        <PasswordInputField
          title='New Password'
          inputProps={{
            ...register('newPassword'),
          }}
          error={errors.newPassword}
        />
        <PasswordInputField
          title='Confirm Password'
          inputProps={{
            ...register('confirmPassword'),
          }}
          error={errors.confirmPassword}
        />
        <SubmitButton
          variant="primary"
          size='lg'
          className="w-full"
          disabled={isPending}
          loading={isPending}
          label="Change Password"
          processingLabel="Changing Password..."
        />
      </form>
    </div>
  );
};

export default ChangePasswordForm;