"use client";

import { AppSidebar } from "@/components/app-sidebar";
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

import { SidebarProvider } from "@/components/ui/sidebar";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";

export default function Body({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <AlertDialog>
      <Head>
        <title>Internnook</title>
      </Head>
      <SidebarProvider>
        <AppSidebar />
        {children}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </SidebarProvider>
    </AlertDialog>
  );
}
