"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Eye, EyeOff, Lock, LogIn, Mail, UserPlus2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {signinSchema} from "@/schemas/authValidationSchema";
import {doCredentialLogin} from "@/actions/authActions";
import {toast} from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import {AUTH_ROUTES} from "@/constants/auth";

type LoginFormData = z.infer<typeof signinSchema>;

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    doCredentialLogin({ data })
    .then((result) => {
      if (result.error) {
        toast.error(result.error);
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3"
      style={{ backgroundColor: "#eef2f6" }}
    >
      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="App Logo"
            width={100}
            height={100}
            className="h-12 w-60 object-contain mx-auto"
          />
        </div>

        {/* Login Card */}
        <Card className="sm:px-4 py-15 border-0 bg-white sm:shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your account
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
                <input type="text" style={{ display: 'none' }} autoComplete="username" />
                <input type="password" style={{ display: 'none' }} autoComplete="current-password" />
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="off"
                          className="h-12 bg-white border-gray-200 focus:border-green-300 focus:outline-none transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
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
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <div>
                  <Link className="block text-green-600 hover:text-green-800 italic text-sm text-right" href="/forgot-password">
                      Forgot Password
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </div>
                  )}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={AUTH_ROUTES.SIGN_UP}
                    className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                  >
                    <UserPlus2 className="w-4 h-4" />
                    Create Account
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

export default SigninPage;
