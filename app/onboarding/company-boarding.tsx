"use client";

import { useForm, Controller } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  logo: z.any().refine((fileList: FileList) => fileList?.length > 0, {
    message: "Logo is required",
  }),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().min(1, "Address is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CompanyBoarding() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      industry: "",
      address: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    formData.append("industry", data.industry);
    formData.append("address", data.address);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_COMPANIES_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      localStorage.setItem("name", data.name);
      router.push("/getting-started");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any,
    } catch (error: any) {
      console.log(error);

      router.push("/error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" {...register("name")} placeholder="Company Name" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="logo">Logo</Label>
          <Input id="logo" type="file" accept="image/*" {...register("logo")} />
          {errors.logo && (
            <p className="text-red-500 text-sm">
              {errors.logo.message as string}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="industry">Industry</Label>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="1234 Main St."
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            For a moment...
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
