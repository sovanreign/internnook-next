"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
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
  department: z.string().min(1, "Department is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CoordinatorBoarding() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const userId = parseInt(localStorage.getItem("id") as string);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const requestData = { ...data, userId };
      await axios.post(
        `${process.env.NEXT_PUBLIC_COORDINATORS_URL}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      localStorage.setItem("name", `${data.firstName} ${data.lastName}`);
      router.push("/getting-started");
    } catch (error) {
      console.error("Error submitting form:", error);
      router.push("/error");
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

        {/* Department Selection */}
        <div className="grid gap-2">
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value) => setValue("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="College of Computer Studies">
                  College of Computer Studies
                </SelectItem>
                <SelectItem value="College of Business and Management">
                  College of Business and Management
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
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
