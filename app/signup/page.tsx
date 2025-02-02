"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Head from "next/head";

const SignupFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
  role: z.enum(["Student", "Coordinator", "Company"], {
    invalid_type_error: "Please select a valid role",
  }),
});

type SignupFormValues = z.infer<typeof SignupFormSchema>;

const URL = process.env.NEXT_PUBLIC_SIGNUP_URL;

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${URL}`, data);

      if (response.status === 201) {
        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);
          const { role, sub } = jwtDecode(access_token) as {
            sub: number;
            role: string;
          };
          localStorage.setItem("id", `${sub}`);
          localStorage.setItem("role", role);

          router.push("/onboarding");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 409) {
        reset();

        setError("email", {
          type: "custom",
          message: "Account already exists",
        });
      } else {
        router.push("/error");
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Head>
        <title>Internnook</title>
      </Head>
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Signup</CardTitle>
              <CardDescription>
                Fill up the form below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Role</Label>
                    </div>
                    <Controller
                      control={control}
                      name="role"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Student">Student</SelectItem>
                              <SelectItem value="Coordinator">
                                Coordinator
                              </SelectItem>
                              <SelectItem value="Company">Company</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role && (
                      <p className="text-sm text-red-500">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Signing up...
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Signup
                    </Button>
                  )}

                  {/* <Button variant="outline" className="w-full">
                    Signup with Google
                  </Button> */}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
