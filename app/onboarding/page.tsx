import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import StudentBoarding from "./student-boarding";
import CompanyBoarding from "./company-boarding";
import CoordinatorBoarding from "./coordinator-boarding";

export default function OnBoarding() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg  ">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome!</CardTitle>
              <CardDescription>
                Let&apos;s get some basic information to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <StudentBoarding /> */}
              {/* <CompanyBoarding /> */}
              <CoordinatorBoarding />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
