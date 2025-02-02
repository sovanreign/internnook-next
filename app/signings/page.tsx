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
import { Internship, Moa } from "../models/models";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Internships() {
  const [moas, setMoas] = useState<Moa[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const role = localStorage.getItem("role");
  const [filteredMoas, setFilteredMoas] = useState<Moa[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMoas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MOAS_URL}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setMoas(response.data);
        setFilteredMoas(response.data);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoas();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = moas.filter(
      (moa) =>
        moa.application.internship.position.toLowerCase().includes(query) ||
        moa.application.internship.shortInfo.toLowerCase().includes(query)
    );

    setFilteredMoas(filtered);
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
                      Signings
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
            </div>
            {filteredMoas.length === 0 ? (
              <div className="w-full text-center mt-10">No MOA posted yet</div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredMoas.map((moa) => (
                    <Card
                      key={moa.id}
                      className="relative cursor-pointer"
                      onClick={() =>
                        router.push(`/signings/details?id=${moa.id}`)
                      }
                    >
                      <Badge
                        variant={
                          moa.status === "Pending" ? "default" : "destructive"
                        }
                        className="absolute top-2 right-2"
                      >
                        {moa.status === "Pending" ? "Pending" : "Completed"}
                      </Badge>

                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${moa.company.logoUrl}`}
                              alt="logo"
                              width={50}
                              height={50}
                              className="py-2 rounded-lg"
                            />
                            <CardTitle>
                              {moa.application.internship.position}
                            </CardTitle>
                            <CardDescription>
                              <p className="text-sm">
                                {moa.student.firstName} {moa.student.lastName}
                              </p>
                              <p className="text-sm">{moa.student.school}</p>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
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
