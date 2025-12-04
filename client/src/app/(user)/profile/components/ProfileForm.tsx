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
  const {mutate, isPending} = updateInfo;

  const {register, handleSubmit, formState: {errors}} = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: userObj.user?.email || "",
      fullname: userObj.user?.name || ""
    }
  });

  const onSubmit = (data: FieldValues) => {
    mutate({fullname: data.fullname});
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
          loading={isPending}
          disabled={isPending}
        />
      </form>
    </div>
  );
};

export default ProfileForm;