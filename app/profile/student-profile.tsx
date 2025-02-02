"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Student } from "../models/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_STUDENTS_URL;

export default function StudentProfile() {
  const [student, setStudent] = useState<Student>();
  const [loading, setLoading] = useState(true);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [userId]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadResume = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return alert("Please select a PDF file.");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("userId", userId!);

      await axios.patch(`${API_URL}/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resume uploaded successfully!");
      window.location.reload(); // Refresh to show updated resume
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <main>Loading...</main>;
  if (!student) return <main>No student data found.</main>;

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
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
              <strong>Department:</strong> {student.coordinator.department}
            </p>
            <p>
              <strong>Coordinator:</strong> {student.coordinator.firstName}{" "}
              {student.coordinator.lastName}
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                {student.resumeUrl ? "View Resume" : "Upload Resume"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {student.resumeUrl ? "Resume Preview" : "Upload Resume"}
                </DialogTitle>
              </DialogHeader>

              {student.resumeUrl ? (
                // ✅ Show PDF if `resumeUrl` exists
                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${student.resumeUrl}`}
                  className="w-full h-[500px]"
                ></iframe>
              ) : (
                // ✅ Show upload form if `resumeUrl` is `null`
                <form onSubmit={handleUploadResume}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm leading-relaxed">
            {student?.bio || "No bio inserted yet."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
