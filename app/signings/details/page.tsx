"use client";

import Body from "@/app/body";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocusealForm } from "@docuseal/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCreate } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { Moa } from "@/app/models/models";

export default function SigningDetails() {
  const [moa, setMoa] = useState<Moa>();
  const searchParams = useSearchParams();
  const moaId = searchParams.get("id");
  const role = localStorage.getItem("role");
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [submissionStatus, setSubmissionStatus] = useState({
    student: false,
    coordinator: false,
    company: false,
  });

  useEffect(() => {
    const fetchSubmissionStatus = async () => {
      try {
        if (!moaId) return;
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          `https://docuseal.com/submissions/${moaId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const submissionData = response.data;
        console.log("Submission Data:", submissionData);

        setSubmissionStatus({
          student: submissionData.studentSigned || false,
          coordinator: submissionData.coordinatorSigned || false,
          company: submissionData.companySigned || false,
        });
      } catch (error) {
        console.error("Error fetching submission status:", error);
      }
    };

    fetchSubmissionStatus();
  }, [moaId]);

  useEffect(() => {
    const fetchMoa = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MOAS_URL}/${moaId}`, // Replace with correct endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMoa(response.data);
        console.log("Fetched MOA:", response.data);
      } catch (error) {
        console.error("Error fetching MOA:", error);
      } finally {
        setLoading(false);
      }
    };

    if (moaId) {
      fetchMoa();
    }
  }, [moaId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Body>
      <main className="w-full">
        <SidebarInset>
          {/* Header Section */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/signings" className="font-semibold">
                      Signings
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="font-semibold">
                      Details
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            {/* PDF Viewer Section */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  Document Signing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full flex justify-center gap-2">
                  <Button
                    disabled={role !== "Student"}
                    onClick={() => setOpenDialog("Student")}
                  >
                    <MdOutlineCreate /> Student Sign
                  </Button>
                  <Button
                    disabled={role !== "Coordinator"}
                    onClick={() => setOpenDialog("Coordinator")}
                  >
                    <MdOutlineCreate /> Coordinator Sign
                  </Button>
                  <Button
                    disabled={role !== "Company"}
                    onClick={() => setOpenDialog("Company")}
                  >
                    <MdOutlineCreate /> Company Sign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Request Copies Section */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Request Copies
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="secondary" className="text-sm">
                  Request a Signed Copy
                </Button>
                <Button variant="secondary" className="text-sm">
                  Request a Sealed Copy
                </Button>
              </CardContent>
            </Card>

            {/* Signing Details */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Signing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">Student:</p>
                  <p className="text-sm text-gray-800">
                    {moa?.student.firstName} {moa?.student.lastName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Coordinator:
                  </p>
                  <p className="text-sm text-gray-800">
                    {moa?.coordinator.firstName} {moa?.coordinator.lastName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Organization:
                  </p>
                  <p className="text-sm text-gray-800">{moa?.student.school}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">Company:</p>
                  <p className="text-sm text-gray-800">{moa?.company.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-600">Status:</p>
                  <Badge variant="outline" className="text-sm">
                    {moa?.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Signing History */}
            <Card className="bg-white shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Signing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-[300px]">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Student signed the document
                      </p>
                      <p className="text-sm text-gray-400">
                        2023-12-01 10:30 AM
                      </p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Coordinator reviewed the document
                      </p>
                      <p className="text-sm text-gray-400">
                        2023-12-01 11:00 AM
                      </p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Document sent to the company
                      </p>
                      <p className="text-sm text-gray-400">
                        2023-12-01 11:30 AM
                      </p>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {openDialog && (
            <Dialog
              open={!!openDialog}
              onOpenChange={() => setOpenDialog(null)}
            >
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{openDialog} Signature</DialogTitle>
                </DialogHeader>
                <div className="w-[800px] max-w-full h-[600px] bg-gray-100 rounded-lg border overflow-auto p-4">
                  <div>
                    {openDialog === "Student" && (
                      <DocusealForm
                        src={`https://docuseal.com/s/${moa?.studentSlug}`}
                        email={moa?.student.user.email}
                      />
                    )}
                    {openDialog === "Coordinator" && (
                      <DocusealForm
                        src={`https://docuseal.com/s/${moa?.coordinatorSlug}`}
                        email={moa?.coordinator.user.email}
                      />
                    )}
                    {openDialog === "Company" && (
                      <DocusealForm
                        src={`https://docuseal.com/s/${moa?.companySlug}`}
                        email={moa?.company.user.email}
                      />
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </SidebarInset>
      </main>
    </Body>
  );
}
