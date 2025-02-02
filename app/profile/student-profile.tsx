import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const StudentProfile = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              John Doe
            </CardTitle>
            <p className="text-sm text-gray-500">Computer Science Student</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Node.js</Badge>
              <Badge variant="outline">Python</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Email:</strong> johndoe@gmail.com
            </p>
            <p>
              <strong>University:</strong> Stanford University
            </p>
            <p>
              <strong>Location:</strong> Palo Alto, CA
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
            I am a Computer Science student passionate about building scalable
            web applications and solving complex problems. I have experience
            working with modern web frameworks and love collaborating on
            innovative projects.
          </p>
          <h3 className="font-semibold my-4">Skills</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">
              Proficient in React and Redux
            </li>
            <li className="text-sm text-gray-600">
              Experienced with Node.js and Express
            </li>
            <li className="text-sm text-gray-600">
              Strong foundation in Data Structures & Algorithms
            </li>
            <li className="text-sm text-gray-600">
              Skilled in database management (SQL and MongoDB)
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Internship Applications */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Internship Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Frontend Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">Tech Innovators Inc.</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </li>
            <li className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Software Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">Global Tech Co.</p>
                </div>
                <Badge>Accepted</Badge>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Backend Developer Intern
                  </p>
                  <p className="text-xs text-gray-500">StartUp Hub</p>
                </div>
                <Badge variant="destructive">Rejected</Badge>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
