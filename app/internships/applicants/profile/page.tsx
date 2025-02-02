"use client";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/app/models/models";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import Body from "@/app/body";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ApplicantProfile() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");

  const [student, setStudent] = useState<Student>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STUDENTS_URL}/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

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
                    <BreadcrumbLink href="/internships">
                      Internships
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      className="cursor-pointer"
                      onClick={() => window.history.back()}
                    >
                      Applicants
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="font-semibold">
                      Profile
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {loading ? (
              <p>Loading student profile...</p>
            ) : student ? (
              <div className="container mx-auto py-8 space-y-8">
                <Card className="bg-white shadow-sm rounded-lg">
                  <CardHeader className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={"https://github.com/shadcn.png"} />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-semibold text-center">
                        {student.firstName} {student.lastName}
                      </CardTitle>
                      <p className="text-sm text-gray-500 text-center">
                        {student.program}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{student.user.email}</Badge>
                        <Badge variant="outline">{student.school}</Badge>
                        <Badge variant="outline">{student.program}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <strong>Department:</strong>{" "}
                        {student.coordinator.department}
                      </p>
                      <p>
                        <strong>Coordinator:</strong>{" "}
                        {student.coordinator.firstName}{" "}
                        {student.coordinator.lastName}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          {student.resumeUrl ? "View Resume" : "No Resume"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <AlertDialogHeader>
                          <DialogTitle>
                            {student.resumeUrl ? "Resume Preview" : "No Resume"}
                          </DialogTitle>
                        </AlertDialogHeader>
                        <iframe
                          src={`${API_URL}${student.resumeUrl}`}
                          className="w-full h-[500px]"
                        ></iframe>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* About Section */}
                <Card className="bg-white shadow-sm rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {student?.bio || "No bio inserted yet."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <p className="text-red-500">Student not found.</p>
            )}
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
