"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Body from "../body";

import { useEffect, useState } from "react";
import axios from "axios";
import { Internship } from "../models/models";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Internships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const role = localStorage.getItem("role");
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_INTERNSHIPS_URL}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setInternships(response.data);
        setFilteredInternships(response.data);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = internships.filter(
      (internship) =>
        internship.position.toLowerCase().includes(query) ||
        internship.shortInfo.toLowerCase().includes(query)
    );

    setFilteredInternships(filtered);
  };

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
                    <BreadcrumbPage className="font-semibold">
                      Internships
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-end gap-4 mb-4">
              <div className="flex items-center w-1/4 space-x-2 rounded-lg border border-gray-300 dark:bg-gray-900 px-3.5">
                <SearchIcon className="h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full border-0 h-8 font-semibold"
                />
              </div>
              {role === "Company" ? (
                ""
              ) : (
                <div>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Tech</SelectItem>
                        <SelectItem value="banana">Food</SelectItem>
                        <SelectItem value="blueberry">Health</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {role === "Company" && (
                <div>
                  <Link href="/internships/create">
                    <Button>
                      <MdAdd /> Add Internship
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {filteredInternships.length === 0 ? (
              <div className="w-full text-center mt-10">
                No internship position posted yet
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredInternships.map((internship) => (
                    <Card
                      key={internship.id}
                      className="relative cursor-pointer"
                      onClick={() =>
                        router.push(`/internships/detail?id=${internship.id}`)
                      }
                    >
                      <Badge
                        variant={internship.isOpen ? "default" : "destructive"}
                        className="absolute top-2 right-2"
                      >
                        {internship.isOpen ? "Open" : "Closed"}
                      </Badge>

                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${internship.company.logoUrl}`}
                              alt="logo"
                              width={50}
                              height={50}
                              className="py-2 rounded-lg"
                            />
                            <CardTitle>{internship.position}</CardTitle>
                            <CardDescription>
                              {internship.shortInfo}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            3 applicants
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
