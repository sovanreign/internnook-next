"use client";

import Body from "@/app/body";
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
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function InternshipDetail() {
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);

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
                    src="/next.svg" // Replace with your logo's path
                    alt="Company Logo"
                    className="rounded"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex-grow ml-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Frontend Development Intern
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    <span className="font-medium">Company Name:</span> Tech
                    Innovators
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

              {/* Combined Details Section */}
              <section className="mt-10">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Job Description
                      </h3>
                      <p className="text-gray-700 mt-2">
                        We are looking for a motivated Frontend Development
                        Intern to join our team! As an intern, you will work
                        closely with our developers to create user-friendly
                        interfaces for web applications and contribute to the
                        overall design process.
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Responsibilities
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                        <li>
                          Develop responsive web pages using React and Tailwind
                          CSS.
                        </li>
                        <li>
                          Participate in agile development processes and daily
                          standups.
                        </li>
                        <li>Work on debugging and optimizing performance.</li>
                        <li>
                          Collaborate with designers and backend developers.
                        </li>
                      </ul>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Qualifications
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                        <li>Basic understanding of React.js and JavaScript.</li>
                        <li>Familiarity with Tailwind CSS is a plus.</li>
                        <li>
                          Good problem-solving skills and attention to detail.
                        </li>
                        <li>
                          Eagerness to learn and grow in a collaborative
                          environment.
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Call to Action Section */}
              <section className="text-center py-10">
                <Button
                  onClick={() => setApplyDialogOpen(true)}
                  className="px-6 py-3 text-lg"
                >
                  Apply for Internship
                </Button>
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
