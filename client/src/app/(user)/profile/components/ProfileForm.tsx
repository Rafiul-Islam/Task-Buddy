"use client";

import React from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {userFormData, userSchema} from "@/schemas/userSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import {useUser} from "@/hooks/useUser";

const ProfileForm = () => {
  const {userObj} = useUser();
  const {updateInfo} = useUser();

  const {register, handleSubmit, formState: {errors, isLoading, isSubmitting}} = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: userObj.user?.email || "",
      fullname: userObj.user?.name || ""
    }
  });

  const onSubmit = (data:FieldValues) => {
    updateInfo.mutate({fullname: data.fullname});
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          title="Email"
          inputProps={{
            type: "email",
            placeholder: "Enter your email",
            ...register("email")
          }}
          error={errors.email}
          disabled={true}
        />
        <InputField
          title="Full Name"
          inputProps={{
            type: "text",
            placeholder: "Enter your full name",
            ...register("fullname")
          }}
          error={errors.fullname}
        />
        <SubmitButton
          className='w-full'
          variant="primary"
          size="lg"
          label='Submit'
          processingLabel="Submitting..."
          loading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting}
        />
      </form>
    </div>
  );
};

export default ProfileForm;