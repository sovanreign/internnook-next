import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CoordinatorProfile = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CT</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Dr. Alice Johnson
            </CardTitle>
            <p className="text-sm text-gray-500">Internship Coordinator</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Computer Science</Badge>
              <Badge variant="outline">10+ Years Experience</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Email:</strong> alice.johnson@university.edu
            </p>
            <p>
              <strong>Department:</strong> Computer Science & Engineering
            </p>
            <p>
              <strong>Location:</strong> Stanford University, CA
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
            Dr. Alice Johnson is a seasoned educator with over 10 years of
            experience mentoring students and overseeing internship programs.
            She is passionate about guiding students toward impactful career
            opportunities in technology and innovation.
          </p>
        </CardContent>
      </Card>

      {/* Students Under Supervision */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Students Under Supervision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">
                  Software Developer Intern
                </p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-gray-500">
                  Frontend Developer Intern
                </p>
              </div>
              <Badge>Completed</Badge>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Tom Brown</p>
                <p className="text-xs text-gray-500">
                  Backend Developer Intern
                </p>
              </div>
              <Badge>Pending Approval</Badge>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Internship Approvals */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Pending Internship Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">
                  Software Developer Intern
                </p>
              </div>
              <Button size="sm" variant="outline">
                Approve
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-gray-500">
                  Frontend Developer Intern
                </p>
              </div>
              <Button size="sm" variant="outline">
                Approve
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoordinatorProfile;
