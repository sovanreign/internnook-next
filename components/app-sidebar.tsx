"use client";

import { Settings } from "lucide-react";
import {
  MdLogout,
  MdNotificationsNone,
  MdOutlineCardTravel,
  MdOutlineDashboard,
  MdOutlineDescription,
  MdOutlineGroups,
  MdOutlinePerson,
} from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertDialogTrigger } from "./ui/alert-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdOutlineDashboard,
    roles: ["Student", "Coordinator", "Company"],
  },
  {
    title: "Internships",
    url: "/internships",
    icon: MdOutlineCardTravel,
    roles: ["Student", "Coordinator", "Company"],
  },
  {
    title: "Students",
    url: "/students",
    icon: MdOutlineGroups,
    roles: ["Coordinator"],
  },
  {
    title: "Applications",
    url: "/applications",
    icon: MdOutlineDescription,
    roles: ["Student"],
  },
  {
    title: "Signings",
    url: "/signings",
    icon: MdOutlineDescription,
    roles: ["Student", "Coordinator", "Company"],
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: MdNotificationsNone,
    roles: ["Student", "Coordinator", "Company"],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: MdOutlinePerson,
    roles: ["Student", "Coordinator", "Company"],
  },
];

export function AppSidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  <Image
                    src={"/logo-light.svg"}
                    alt=""
                    width={130}
                    height={130}
                  />
                </span>
                {/* <span className="truncate text-xs">
                  Internship at your nook
                </span> */}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => item.roles.includes(role ?? ""))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a>
                    <MdLogout />
                    <AlertDialogTrigger>Logout</AlertDialogTrigger>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
