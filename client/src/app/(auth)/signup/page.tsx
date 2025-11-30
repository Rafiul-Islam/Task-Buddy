"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Eye, EyeOff, Lock, Mail, User as UserIcon, UserPlus2} from "lucide-react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {signupSchema} from "@/schemas/authValidationSchema";
import {toast} from "react-toastify";
import Image from "next/image";
import {httpClient} from "@/lib/http-client";
import type {AxiosError} from "axios";
import {AUTH_ROUTES} from "@/constants/auth";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {API} from "@/lib/api";
import {ApiResponse} from "@/types/auth";
import {User} from "@/types/user";

type SignupFormData = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    httpClient.post<ApiResponse<User>>(API.AUTH.REGISTER, {...data})
    .then((response) => {
      const msg = response.data.message ? response.data.message : "Registration Successful";
      toast.success(msg);
      router.push(AUTH_ROUTES.SIGN_IN);
    })
    .catch((error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  useEffect(() => {
    // Enable form after a short delay to prevent autofill
    const timer = setTimeout(() => {
      setIsFormReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Fill in the details to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off"
                className="space-y-6"
              >
                {/* Hidden dummy fields to prevent autofill */}
                <input type="text" style={{display: 'none'}} autoComplete="name"/>
                <input type="email" style={{display: 'none'}} autoComplete="email"/>
                <input type="password" style={{display: 'none'}} autoComplete="new-password"/>
                <input type="text" style={{display: 'none'}} name="fake-username"/>
                <input type="password" style={{display: 'none'}} name="fake-password"/>
                <input type="email" style={{display: 'none'}} name="fake-email"/>
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <UserIcon className="w-4 h-4"/>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          type="text"
                          autoComplete="off"
                          readOnly={!isFormReady}
                          onFocus={(e) => e.target.removeAttribute('readonly')}
                          data-form-type="other"
                          className="h-12 bg-white border-gray-200 focus:border-green-300 focus:outline-none transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm"/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4"/>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="off"
                          readOnly={!isFormReady}
                          onFocus={(e) => e.target.removeAttribute('readonly')}
                          data-form-type="other"
                          className="h-12 bg-white border-gray-200 focus:border-green-300 focus:outline-none transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm"/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({field, fieldState}) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4"/>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Create a password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
                            readOnly={!isFormReady}
                            onFocus={(e) => e.target.removeAttribute('readonly')}
                            data-form-type="other"
                            className={`h-12 bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200 pr-12 ${
                              fieldState.error
                                ? "border-red-500 focus:border-red-500 ring-red-500/20"
                                : "border-gray-200 focus:border-green-300"
                            }`}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-500"/>
                            ) : (
                              <Eye className="w-4 h-4 text-gray-500"/>
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm"/>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus2 className="w-4 h-4"/>
                      Create Account
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href={AUTH_ROUTES.SIGN_IN}
                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
