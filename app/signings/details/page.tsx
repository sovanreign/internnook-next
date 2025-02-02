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

export default function SigningDetails() {
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
                  Document Viewer
                </CardTitle>
                <Button className="text-sm">Sign Document</Button>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[500px] bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400">
                  <embed
                    src="/MOA.pdf"
                    width="100%"
                    height="100%"
                    type="application/pdf"
                  />
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
                  <p className="text-sm text-gray-800">John Doe</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Coordinator:
                  </p>
                  <p className="text-sm text-gray-800">Dr. Alice Johnson</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">
                    Organization:
                  </p>
                  <p className="text-sm text-gray-800">Stanford University</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">Company:</p>
                  <p className="text-sm text-gray-800">Tech Innovators Inc.</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-600">Status:</p>
                  <Badge variant="outline" className="text-sm">
                    Pending
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
        </SidebarInset>
      </main>
    </Body>
  );
}
