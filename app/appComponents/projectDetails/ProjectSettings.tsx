"use client";
import { THEME_OPTIONS, THEMES } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectDetailType } from "@/config/types";
import { CameraIcon, Share2Icon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type props = {
  projectDetails: projectDetailType | undefined;
};
const ProjectSettings = ({ projectDetails }: props) => {
  const [selectedTheme, setSelectedTheme] = useState<string>(
    THEME_OPTIONS[0].value,
  );
  const [projectName, setProjectName] = useState<string>(
    projectDetails?.projectName ?? "",
  );
  const [newScreenPrompt, setNewScreenPrompt] = useState<string>("");

  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails?.projectName ?? "");
    }
  }, [projectDetails]);
  return (
    <div className="w-[280px] flex flex-col gap-4 shrink-0  p-5 min-h-[calc(100vh-49px)] bg-gray-50 border-r border-gray-200">
      <div className="w-full flex flex-col gap-1.5">
        <h4 className="text-sm font-semibold">Settings</h4>
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs text-foreground">Project Name</label>
        <Input
          placeholder="Enter project name... "
          className="placeholder:text-xs !rounded-sm border-secondary/20"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs text-foreground">Generate New Screen</label>
        <Textarea
          placeholder="Enter your prompt to generate a new screen..."
          className="placeholder:text-xs !rounded-sm border-secondary/20 min-h-32"
          value={newScreenPrompt}
          onChange={(e) => setNewScreenPrompt(e.target.value)}
        />
        <Button size={"sm"} className="w-full rounded-sm">
          <Sparkles className="size-3" /> Generate with AI
        </Button>
      </div>
      <div className="w-full flex flex-col gap-3">
        <h5 className="text-xs text-foreground">Themes</h5>
        <div className="max-h-[240px] overflow-y-auto grid gap-2 scrollbar-none">
          {THEME_OPTIONS.map((theme) => {
            const themeColors = THEMES[theme.value];

            return (
              <div
                className={`py-2 px-2 border border-border rounded-md cursor-pointer ${
                  selectedTheme === theme.value ? "border-secondary" : ""
                }`}
                key={theme.value}
                onClick={() => setSelectedTheme(theme.value)}
              >
                <p className="text-xs text-foreground font-medium mb-2">
                  {theme.label}
                </p>

                <div className="flex items-center gap-1.5">
                  <div
                    className="size-7 rounded-full"
                    style={{ backgroundColor: themeColors.primary }}
                  />

                  <div
                    className="size-7 rounded-full"
                    style={{ backgroundColor: themeColors.secondary }}
                  />

                  <div
                    className="size-7 rounded-full"
                    style={{ backgroundColor: themeColors.accent }}
                  />
                  <div
                    className={`size-7 rounded-full `}
                    style={{ backgroundColor: themeColors.background }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex  gap-1.5 mb-10">
        <Button variant={"outline"} className={"rounded-sm"}>
          <CameraIcon className="size-4" /> Take a screenshot
        </Button>
        <Button variant={"outline"} className={"rounded-sm"}>
          <Share2Icon className="size-3" /> Share
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettings;
