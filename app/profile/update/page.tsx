"use client";

import Body from "@/app/body";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  industry: z.string().min(2, "Industry is required"),
  address: z.string().optional(),
  bio: z.string().optional(),
  logoUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const COMPANY_API = process.env.NEXT_PUBLIC_COMPANIES_URL;

export default function UpdateProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!userId) {
      router.push("/error");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const { name, industry, address, bio, logoUrl } = response.data;
        setValue("name", name);
        setValue("industry", industry);
        setValue("address", address || "");
        setValue("bio", bio || "");
        setValue("logoUrl", logoUrl || "");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, router, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setError(null);
      await axios.patch(`${COMPANY_API}/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrl = uploadResponse.data.url;
      setValue("logoUrl", uploadedUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <main>Loading...</main>;

  return (
    <Body>
      <main className="w-full">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/profile" className="font-semibold">
                      Profile
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="font-semibold">
                      Update
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <div className="container mx-auto py-8">
              <Card className="bg-white shadow-sm rounded-lg max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Update Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Logo Upload */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={
                            API_URL +
                            (register("logoUrl").value || "/default-avatar.png")
                          }
                        />
                        <AvatarFallback>IN</AvatarFallback>
                      </Avatar>
                      <div>
                        <Label className="block text-sm font-medium">
                          Company Logo
                        </Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                        {uploading && (
                          <p className="text-sm text-gray-500">Uploading...</p>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label>Name</Label>
                      <Input {...register("name")} />
                      {errors.name && (
                        <p className="text-red-500 text-xs">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label>Email</Label>
                      <Input type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-red-500 text-xs">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Industry */}
                    <div>
                      <Label>Industry</Label>
                      <Input {...register("industry")} />
                      {errors.industry && (
                        <p className="text-red-500 text-xs">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <Label>Address</Label>
                      <Input {...register("address")} />
                    </div>

                    {/* Bio */}
                    <div>
                      <Label>Bio</Label>
                      <textarea {...register("bio")} rows={3} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
