"use client";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Body from "../body";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CompanyProfile from "./company-profile";
import StudentProfile from "./student-profile";
import CoordinatorProfile from "./coordinator-profile";

export default function Profile() {
  const role = localStorage.getItem("role");

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
                    <BreadcrumbPage className="font-semibold">
                      Profile
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {role === "Student" && <StudentProfile />}
            {role === "Coordinator" && <CoordinatorProfile />}
            {role === "Company" && <CompanyProfile />}
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
