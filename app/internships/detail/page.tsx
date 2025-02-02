"use client";

import Body from "@/app/body";
import { Internship } from "@/app/models/models";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import { convertFromRaw } from "draft-js";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { MdOutlineModeEdit } from "react-icons/md";

export default function InternshipDetail() {
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const id = parseInt(localStorage.getItem("id")!);

  const searchParams = useSearchParams();
  const internshipId = searchParams.get("id");
  const router = useRouter();

  const formattedDescription = (description: string) => {
    try {
      if (description === "" || description === null)
        return "<p>No description available</p>";

      const contentState = convertFromRaw(JSON.parse(description));
      return stateToHTML(contentState);
    } catch (error) {
      console.error("Error parsing Draft.js content:", error);
      return "<p>Error displaying description</p>";
    }
  };

  useEffect(() => {
    if (!internshipId) return;

    const fetchInternship = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Internship>(
          `${process.env.NEXT_PUBLIC_INTERNSHIPS_URL}/${internshipId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setInternship(response.data);
      } catch (err) {
        console.error("Error fetching internship:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId, router]);

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
                    <BreadcrumbLink href="/internships">
                      Internships
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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="container mx-auto px-4 py-10">
              {/* Header Section */}
              <section className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${internship?.company.logoUrl}`}
                    alt="Company Logo"
                    className="rounded"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex-grow ml-6">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {internship?.position}
                    </h1>
                    {id === internship?.company.userId && (
                      <Button
                        onClick={() =>
                          router.push(`/internships/update?id=${internship.id}`)
                        }
                      >
                        <MdOutlineModeEdit /> Edit
                      </Button>
                    )}
                  </div>

                  <p className="text-lg text-gray-600 mt-2">
                    <span className="font-medium">Company Name:</span>{" "}
                    {internship?.company.name}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {/* Rating (5 stars) */}
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <StarIcon
                            key={index}
                            className="h-5 w-5 text-yellow-500"
                          />
                        ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">(4.8/5)</span>
                  </div>
                </div>
              </section>

              <section className="mt-6 flex flex-col md:flex-row items-center justify-between  p-6 rounded-lg">
                {/* Applicants Count */}
                <div className="flex items-center">
                  <p className="text-lg text-gray-800 font-semibold">
                    📊 Total Applicants: 3
                  </p>
                </div>
                <Button variant="outline">View Applicants</Button>
              </section>

              {/* Combined Details Section */}
              <section className="mt-10">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="mt-2 prose text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: formattedDescription(internship!.description),
                      }}
                    />
                  </CardContent>
                </Card>
              </section>

              <section className="text-center py-10">
                {role === "Student" ? (
                  <Button
                    onClick={() => setApplyDialogOpen(true)}
                    className="px-6 py-3 text-lg"
                  >
                    Apply for Internship
                  </Button>
                ) : (
                  ""
                )}
              </section>
            </div>

            <AlertDialog
              open={applyDialogOpen}
              onOpenChange={setApplyDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apply</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to apply?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Apply</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
