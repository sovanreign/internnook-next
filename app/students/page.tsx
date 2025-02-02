"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SearchIcon, Copy, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Body from "../body";
import { useRouter } from "next/navigation";
import { Student } from "../models/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_URL = process.env.NEXT_PUBLIC_COORDINATORS_URL;

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [inviteCode, setInviteCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        setStudents(response.data.students);
        setInviteCode(response.data.inviteCode);
      } catch (err) {
        console.error("Error fetching students:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userId, router]);

  // Handle Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  if (loading) return <main>Loading...</main>;

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
                    <BreadcrumbPage className="font-semibold">
                      Students
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Search Bar */}
            <div className="flex items-center justify-end gap-4 mb-4">
              <div className="flex items-center w-1/4 space-x-2 rounded-lg border border-gray-300 px-3.5">
                <SearchIcon className="h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-0 h-8 font-semibold"
                />
              </div>
            </div>

            <div className="w-full flex gap-6 items-start">
              {/* Invite Code Section */}
              <Card className="bg-white shadow-sm rounded-lg w-1/5 h-auto">
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Invite Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 items-center pb-4">
                  <p className="text-lg font-mono bg-gray-100 px-4 py-2 rounded">
                    {inviteCode}
                  </p>
                  <div className="flex space-x-2">
                    {/* Copy Button */}
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                      {isCopied ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                    {/* View in Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Eye className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Your Invite Code</DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-2xl font-mono bg-gray-200 py-4 rounded">
                          {inviteCode}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Students Table */}
              <Card className="w-4/5 bg-white shadow-sm rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Student List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.length > 0 ? (
                        students
                          .filter((student) =>
                            student.lastName
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((student) => (
                            <TableRow key={student.userId}>
                              <TableCell>
                                {student.firstName} {student.lastName}
                              </TableCell>
                              <TableCell>{student.user.email}</TableCell>
                              <TableCell>{student.status}</TableCell>
                              <TableCell>
                                <Button variant="outline">View details</Button>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-gray-500"
                          >
                            No students found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
