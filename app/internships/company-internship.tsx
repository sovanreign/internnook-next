"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Internship } from "../models/models";
import { useRouter } from "next/navigation";

export default function CompanyInternship({
  internships,
}: {
  internships: Internship[];
}) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-end gap-4 mb-4">
        <div className="flex items-center w-1/4 space-x-2 rounded-lg border border-gray-300 dark:bg-gray-900 px-3.5">
          <SearchIcon className="h-4 w-4" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full border-0 h-8 font-semibold "
          />
        </div>
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
        <div>
          <Link href="/internships/create">
            <Button>
              <MdAdd /> Add Internship
            </Button>
          </Link>
        </div>
      </div>
      {internships.length === 0 ? (
        <div className="w-full text-center mt-10">
          No internship position posted yet
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {internships.map((internship) => (
              <Card
                key={internship.id}
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/internships/detail?id=${internship.id}`)
                }
              >
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
                      <CardDescription>{internship.shortInfo}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}
