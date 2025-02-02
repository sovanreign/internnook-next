import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Body from "../body";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Signing() {
  const cards = [
    {
      title: "Card 1",
      description: "This is the first card in the list.",
    },
    {
      title: "Card 2",
      description: "This is the second card in the list.",
    },
    {
      title: "Card 3",
      description: "This is the third card in the list.",
    },
  ];

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
                  placeholder="Search"
                  className="w-full border-0 h-8 font-semibold "
                />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Completed</SelectItem>
                      <SelectItem value="banana">Pending</SelectItem>
                      <SelectItem value="blueberry">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cards.map((card, index) => (
                <Link key={index} href="/signings/details">
                  <Card className="cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Image
                            src="/next.svg"
                            alt="logo"
                            width={50}
                            height={50}
                            className="py-2"
                          />
                          <CardTitle>{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
