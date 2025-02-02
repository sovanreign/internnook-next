"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Coordinator } from "../models/models";

const API_URL = process.env.NEXT_PUBLIC_COORDINATORS_URL;

const CoordinatorProfile = () => {
  const [coordinator, setCoordinator] = useState<Coordinator>();
  const [loading, setLoading] = useState(true);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCoordinator = async () => {
      try {
        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        setCoordinator(response.data);
      } catch (err) {
        console.error("Error fetching coordinator:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinator();
  }, [userId, router]);

  if (loading) return <main>Loading...</main>;

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              {coordinator?.firstName} {coordinator?.lastName}
            </CardTitle>
            <p className="text-sm text-gray-500 text-center">
              {coordinator?.user.role}
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{coordinator?.user.email}</Badge>
              <Badge variant="outline">{coordinator?.school}</Badge>
              <Badge variant="outline">{coordinator?.department}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Students Under Supervision */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Students Under Supervision
          </CardTitle>
        </CardHeader>
        {/* <CardContent>
          <ul className="space-y-4">
            {coordinator.students.length > 0 ? (
              coordinator.students.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">
                      {student.internshipPosition}
                    </p>
                  </div>
                  <Badge variant="secondary">{student.status}</Badge>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No students assigned yet.</p>
            )}
          </ul>
        </CardContent> */}
      </Card>

      {/* Internship Approvals */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Pending Internship Approvals
          </CardTitle>
        </CardHeader>
        {/* <CardContent>
          <ul className="space-y-4">
            {coordinator.pendingApprovals.length > 0 ? (
              coordinator.pendingApprovals.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">
                      {student.internshipPosition}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Approve
                  </Button>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No pending approvals.</p>
            )}
          </ul>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default CoordinatorProfile;
