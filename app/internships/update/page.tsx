"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

import Body from "@/app/body";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const INTERNSHIPS_API = process.env.NEXT_PUBLIC_INTERNSHIPS_URL;

// Define Zod Schema for Form Validation
const internshipSchema = z.object({
  position: z.string().min(2, "Position is required"),
  shortInfo: z.string().min(5, "Short Info must be at least 5 characters"),
});

type InternshipFormValues = z.infer<typeof internshipSchema>;

export default function UpdateInternshipPage() {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("id"); // Get `id` from query params
  const router = useRouter();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipSchema),
  });

  useEffect(() => {
    // Fetch internship details
    const fetchInternship = async () => {
      if (!internshipId) {
        router.push("/error");
        return;
      }

      try {
        setLoading(true);
        const storedCompanyId = localStorage.getItem("id");
        setCompanyId(storedCompanyId);

        const response = await axios.get(`${INTERNSHIPS_API}/${internshipId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const { position, shortInfo, description } = response.data;

        // Pre-fill form fields
        setValue("position", position);
        setValue("shortInfo", shortInfo);

        // Set Draft.js editor state
        const contentState = convertFromRaw(JSON.parse(description));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error fetching internship details:", error);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId, router, setValue]);

  // Convert Draft.js Content to JSON
  const getEditorContentAsJSON = () => {
    const contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState));
  };

  // Handle Inline Styling (Bold, Italic)
  const handleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle Block Styles (Unordered & Ordered List)
  const handleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handle Form Submission
  const onSubmit = async (data: InternshipFormValues) => {
    try {
      const internshipData = {
        position: data.position,
        shortInfo: data.shortInfo,
        description: getEditorContentAsJSON(),
        companyId: Number(companyId),
      };

      await axios.patch(`${INTERNSHIPS_API}/${internshipId}`, internshipData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      router.push(`/internships/detail?id=${internshipId}`);
    } catch (error) {
      console.error("Failed to update internship:", error);
      alert("Failed to update internship. Please try again.");
    }
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
                    <BreadcrumbLink
                      href="/internships"
                      className="font-semibold"
                    >
                      Internships
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="font-semibold">
                      Update
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Internship Position */}
              <div>
                <Label
                  htmlFor="intern-position"
                  className="text-lg font-medium"
                >
                  Internship Position
                </Label>
                <Input
                  id="intern-position"
                  placeholder="e.g., Junior Developer"
                  {...register("position")}
                  className="mt-2"
                />
                {errors.position && (
                  <p className="text-red-500 text-sm">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* Short Info */}
              <div>
                <Label htmlFor="short-info" className="text-lg font-medium">
                  Short Info
                </Label>
                <Textarea
                  id="short-info"
                  placeholder="Brief info about this internship..."
                  {...register("shortInfo")}
                  className="mt-2"
                />
                {errors.shortInfo && (
                  <p className="text-red-500 text-sm">
                    {errors.shortInfo.message}
                  </p>
                )}
              </div>

              {/* Internship Description */}
              <div>
                <Label
                  htmlFor="intern-description"
                  className="text-lg font-medium"
                >
                  Internship Description
                </Label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  {/* Toolbar for inline and block styles */}
                  <div className="mb-4 space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInlineStyle("BOLD")}
                    >
                      Bold
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInlineStyle("ITALIC")}
                    >
                      Italic
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleBlockType("unordered-list-item")}
                    >
                      Bullet List
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleBlockType("ordered-list-item")}
                    >
                      Numbered List
                    </Button>
                  </div>
                  {/* Editor */}
                  <div className="h-96 p-4 border border-gray-300 rounded-lg bg-white">
                    <Editor
                      editorState={editorState}
                      onChange={setEditorState}
                      placeholder="Write a detailed description..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Internship"}
                </Button>
              </div>
            </form>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
