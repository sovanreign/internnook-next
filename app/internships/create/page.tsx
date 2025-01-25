"use client";

import dynamic from "next/dynamic";
import { EditorState, RichUtils } from "draft-js";
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
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddInternshipPage() {
  const [title, setTitle] = useState(""); // Internship title
  const [position, setPosition] = useState(""); // Internship position
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Handle inline styles (bold, italic)
  const handleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle block styles (unordered-list-item, ordered-list-item)
  const handleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Extract the raw content as HTML
  const getContentAsHTML = () => {
    const contentState = editorState.getCurrentContent();
    return contentState.getPlainText(); // Replace with stateToHTML if HTML is needed
  };

  const handleSubmit = () => {
    const description = getContentAsHTML();
    console.log("Internship Data:", { title, position, description });
    alert("Internship successfully added!");
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
                      Create
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {/* Internship Position */}
            <div>
              <Label htmlFor="intern-position" className="text-lg font-medium">
                Internship Position
              </Label>
              <Input
                id="intern-position"
                placeholder="e.g., Junior Developer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-2"
              />
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
                    variant="outline"
                    size="sm"
                    onClick={() => handleInlineStyle("BOLD")}
                  >
                    Bold
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInlineStyle("ITALIC")}
                  >
                    Italic
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBlockType("unordered-list-item")}
                  >
                    Bullet List
                  </Button>
                  <Button
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
              <Button onClick={handleSubmit}>Add Internship</Button>
            </div>
          </div>
        </SidebarInset>
      </main>
    </Body>
  );
}
