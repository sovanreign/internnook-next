"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Body from "@/app/body";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Application } from "@/app/models/models";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Applicants() {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("id");

  const [companyId, setCompanyId] = useState();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!internshipId) return;

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_INTERNSHIPS_URL}/${internshipId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setCompanyId(response.data.companyId);
        setApplications(response.data.applications);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [internshipId, router]);

  const handleCheckboxChange = (studentId: number) => {
    setSelectedApplicants((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleShortlistApplicants = async () => {
    if (selectedApplicants.length === 0) return;

    try {
      const token = localStorage.getItem("access_token");

      // await axios.patch(
      //   `${process.env}/applications/bulk-update`,
      //   {
      //     applicationIds: selectedApplicants,
      //     status: "Reviewing",
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // ✅ Create MOAs for shortlisted applicants
      const moaPayload = selectedApplicants.map((studentId) => {
        const application = applications.find(
          (app) => app.student.userId === studentId
        );
        return {
          studentId: application?.student.userId,
          coordinatorId: application?.student.coordinatorId,
          companyId: companyId,
          applicationId: application?.id,
        };
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_MOAS_URL}/bulk`,
        { data: moaPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applicants shortlisted successfully!");
      window.location.reload(); // Refresh to reflect updated status
    } catch (error) {
      console.error("Error shortlisting applicants:", error);
      alert("Failed to shortlist applicants. Please try again.");
    }
  };

  if (loading) return <main>Loading...</main>;
  if (!applications.length)
    return (
      <main className="text-gray-500 text-center">No applicants found.</main>
    );

  return (
    <Body>
      <main className="w-full">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
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
                    <BreadcrumbPage className="font-semibold">
                      Applicants
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Applicants Table */}
            <div className="bg-white shadow-sm rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app: Application) => (
                    <TableRow key={app.id}>
                      {/* Checkbox for selecting applicants */}
                      <TableCell>
                        <Checkbox
                          checked={selectedApplicants.includes(
                            app.student.userId
                          )}
                          onCheckedChange={() =>
                            handleCheckboxChange(app.student.userId)
                          }
                        />
                      </TableCell>

                      <TableCell>
                        {app.student.firstName} {app.student.lastName}
                      </TableCell>
                      <TableCell>{app.student.user.email}</TableCell>

                      {/* Resume View Button */}
                      <TableCell>
                        {app.student.resumeUrl ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">View Resume</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>
                                  {app.student.firstName}&apos;s Resume
                                </DialogTitle>
                              </DialogHeader>
                              <iframe
                                src={`${API_URL}${app.student.resumeUrl}`}
                                className="w-full h-[600px]"
                              ></iframe>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-gray-500">
                            No resume uploaded
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() =>
                            router.push(
                              `/internships/applicants/profile?id=${app.studentId}`
                            )
                          }
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Actions for Selected Applicants */}
            {selectedApplicants.length > 0 && (
              <div className="mt-4">
                <Button onClick={handleShortlistApplicants}>
                  Shortlist {selectedApplicants.length} Applicants
                </Button>
              </div>
            )}
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
