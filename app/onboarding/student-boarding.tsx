"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  school: z.string().min(1, "School is required"),
  program: z.string().min(1, "Program is required"),
  inviteCode: z.string().min(1, "Invite code is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function StudentBoarding() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    setUserId(storedUserId);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!userId) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("school", data.school);
      formData.append("program", data.program);
      formData.append("inviteCode", data.inviteCode);
      formData.append("userId", userId);

      await axios.post(`${process.env.NEXT_PUBLIC_STUDENTS_URL}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("name", `${data.firstName} ${data.lastName}`);
      router.push("/getting-started");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("inviteCode", {
          type: "manual",
          message: "Invalid invite code. Please check with your coordinator.",
        });
      } else {
        console.error("Error submitting form:", error);
        router.push("/error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* School Selection */}
        <div className="grid gap-2">
          <Label htmlFor="school">School</Label>
          <Select onValueChange={(value) => setValue("school", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your school" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Naga College Foundation, Inc.">
                  Naga College Foundation, Inc.
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.school && (
            <p className="text-red-500 text-sm">{errors.school.message}</p>
          )}
        </div>

        {/* Program Selection */}
        <div className="grid gap-2">
          <Label htmlFor="program">Program</Label>
          <Select onValueChange={(value) => setValue("program", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="BS Computer Science">
                  BS Computer Science
                </SelectItem>
                <SelectItem value="BS Information System">
                  BS Information System
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.program && (
            <p className="text-red-500 text-sm">{errors.program.message}</p>
          )}
        </div>

        {/* Invite Code */}
        <div className="grid gap-2">
          <Label htmlFor="inviteCode">Invite Code</Label>
          <Input id="inviteCode" {...register("inviteCode")} />
          {errors.inviteCode && (
            <p className="text-red-500 text-sm">{errors.inviteCode.message}</p>
          )}
          <p className="text-xs font-normal text-gray-500 italic">
            Ask your coordinator for the invite code.
          </p>
        </div>

        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Submitting...
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Continue
          </Button>
        )}
      </div>
    </form>
  );
}
