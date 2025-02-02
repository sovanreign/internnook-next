"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Company } from "../models/models";
import { useRouter } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CompanyProfile = () => {
  const [company, setCompany] = useState<Company>();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_COMPANIES_URL}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        setCompany(response.data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);

        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, userId]);

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={`${URL}${company?.logoUrl}`} />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              {company?.name}
            </CardTitle>
            <p className="text-sm text-gray-500 text-center capitalize">
              {company?.industry}
            </p>
            <div className="flex items-center space-x-1 text-sm text-yellow-500">
              <Star className="w-4 h-4" />
              <span>4.5 (120 reviews)</span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/profile/update?userId=${userId}`)}
          >
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Email:</strong> {company?.user.email}
            </p>
            <p>
              <strong>Address:</strong> {company?.address}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm leading-relaxed">
            {company?.bio || "No bio inserted yet."}
          </p>
        </CardContent>
      </Card>

      {/* Internship Listings */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Available Internships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Software Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">Remote</p>
                </div>
                <Button size="sm" variant="outline">
                  Apply Now
                </Button>
              </div>
            </li>
            <li className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Frontend Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">
                    On-site: San Francisco
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Apply Now
                </Button>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Backend Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">Remote</p>
                </div>
                <Button size="sm" variant="outline">
                  Apply Now
                </Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
