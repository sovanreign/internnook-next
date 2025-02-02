import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Body from "../body";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: "info",
      title: "New Internship Application Submitted",
      message:
        "Your application for the Software Developer Intern position has been submitted successfully.",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "success",
      title: "Application Approved",
      message:
        "Your application for the Frontend Developer Intern position at Tech Innovators has been approved.",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "warning",
      title: "Application Deadline Approaching",
      message:
        "The deadline for the Backend Developer Intern application is tomorrow.",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "info",
      title: "Coordinator Feedback",
      message:
        "Dr. Alice Johnson has provided feedback on your latest application.",
      time: "3 days ago",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

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
                      Notifications
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="container mx-auto py-8 space-y-6">
              {/* Notification List */}
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="bg-white shadow-sm rounded-lg flex items-start p-4"
                >
                  <div className="mr-4">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium">
                      {notification.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="self-center">
                    View
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
};

export default NotificationsPage;
