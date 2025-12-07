"use client";

import React from 'react';
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import InputField from "@/components/InputField";
import {useForm} from "react-hook-form";
import {ForgotPasswordFormData, forgotPasswordSchema} from "@/schemas/authValidationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {MailIcon} from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import useForgotPassword from "@/hooks/useForgotPassword";

const ForgotPasswordPage = () => {

  const {isPending, mutate, reset} = useForgotPassword();

  const {register, handleSubmit, formState: {errors}} = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset()
      }
    });
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-3" style={{backgroundColor: "#eef2f6"}}>
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Deen Discovery"
            width={100}
            height={100}
            className="h-12 w-60 object-contain mx-auto"
          />
        </div>

        <Card
          className="sm:px-4 py-15 border-0 bg-white sm:shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 w-2/3 mx-auto">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                title="Email"
                inputProps={{
                  type: "email",
                  placeholder: "Enter your email",
                  ...register("email")
                }}
                icon={<MailIcon size={18}/>}
                error={errors.email}
              />
              <SubmitButton
                size='lg'
                className='w-full'
                title="Submit"
                processingLabel="Submitting..."
                loading={isPending}
                disabled={isPending}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;