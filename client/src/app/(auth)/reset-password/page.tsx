"use client";

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useResetPassword from "@/hooks/useResetPassword";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {LockIcon} from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import {useForm} from "react-hook-form";
import {ResetPasswordFormData, resetPasswordSchema} from "@/schemas/authValidationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "@/components/PasswordInputField";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";
import Loader from "@/components/Loader";

const ResetPasswordPage = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("reset-password-token") || "";

  const {
    validateToken,
    resetPassword: {isPending, mutate: resetPassword},
  } = useResetPassword();

  useEffect(() => {
    validateToken.mutate(
      {token},
      {
        onSuccess: () => {
          setIsTokenValid(true);
          setLoading(false);
        },
        onError: (error) => {
          setIsTokenValid(false);
          setTokenError(error.message);
          setLoading(false);
        },
      }
    );
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({...data, token}, {
        onSuccess: () => {
          reset();
          router.replace("/signin");
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    );
  };

  if (loading) return <Loader fullScreen/>
  return (
    <div
      className="min-h-screen flex items-center justify-center p-3"
      style={{backgroundColor: "#eef2f6"}}
    >
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 w-2/3 mx-auto">
              Reset your password
            </CardDescription>
          </CardHeader>

          {!isTokenValid && tokenError && (
            <CardContent className="text-red-600 text-center">
              {tokenError}
              <div className='mt-5'>
                <Link href="/forgot-password">
                  <Button variant="info">
                    Reset Password Again
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}

          {isTokenValid && !tokenError && (
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                  title="New Password"
                  inputProps={{
                    type: "password",
                    placeholder: "Enter your new password",
                    ...register("newPassword")
                  }}
                  icon={<LockIcon size={18}/>}
                  error={errors.newPassword}
                />

                <PasswordInput
                  title="Confirm Password"
                  inputProps={{
                    type: "password",
                    placeholder: "Enter your password again",
                    ...register("confirmPassword")
                  }}
                  icon={<LockIcon size={18}/>}
                  error={errors.confirmPassword}
                />

                <SubmitButton
                  size="lg"
                  className="w-full"
                  title="Submit"
                  processingLabel="Submitting..."
                  loading={isPending}
                  disabled={isPending}
                />
              </form>
              <div className='mt-5 text-center flex justify-center items-center gap-2'>
                <p>Already have an account?</p>
                <Link className="text-green-600 hover:underline" href="/signin">
                  Login
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;