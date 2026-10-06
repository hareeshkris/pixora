"use client";

import ProjectCanvas from "@/app/appComponents/projectDetails/ProjectCanvas";
import ProjectHeader from "@/app/appComponents/projectDetails/ProjectHeader";
import ProjectSettings from "@/app/appComponents/projectDetails/ProjectSettings";
import { projectDetailType, screenConfigType } from "@/config/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ProjectDetailPage = () => {
  const [projectDetail, setProjectDetail] = useState<projectDetailType>();

  const [screenConfig, setScreenConfig] = useState<screenConfigType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>();

  const { projectId } = useParams();

  // Prevent duplicate generation requests
  const generationStarted = useRef(false);

  useEffect(() => {
    if (!projectId) return;

    getProjectDetails();
  }, [projectId]);

  const getProjectDetails = async () => {
    if (!projectId) return;

    setLoading(true);
    setError(undefined);

    try {
      const response = await axios.get(`/api/project?projectId=${projectId}`);

      console.log("Project response:", response.data);

      const detail: projectDetailType = response.data.projectDetail;

      const screens: screenConfigType[] = response.data.screenConfig ?? [];

      setProjectDetail(detail);
      setScreenConfig(screens);

      // Generate screens only when there are no existing screens
      if (screens.length === 0 && !generationStarted.current) {
        generationStarted.current = true;

        const generatedConfig = await generateScreenConfig(detail);

        if (generatedConfig) {
          setScreenConfig(generatedConfig.screens ?? []);
        }
      }
    } catch (err) {
      console.error("Project loading error:", err);

      setError(
        axios.isAxiosError(err)
          ? (err.response?.data?.error ?? err.message)
          : "Failed to load project",
      );
    } finally {
      setLoading(false);
    }
  };

  const generateScreenConfig = async (detail: projectDetailType) => {
    try {

      const response = await axios.post("/api/generate-config", {
        projectId,
        deviceType: detail.device,
        userInput: detail.userInput,
      });


      const generatedScreenConfig = response.data.jsonAIResult;
      getProjectDetails()

      console.log(generatedScreenConfig, "generatedscreenconfig");

      return generatedScreenConfig;
    } catch (error) {
      console.error("Failed to generate screen config:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Failed to generate screen config";

        setError(errorMessage);
      } else {
        setError("Failed to generate screen config");
      }

      return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-0">
      <ProjectHeader />

      {loading && (
        <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center">
          <Loader2 className="animate-spin size-6" />
        </div>
      )}

      {error && (
        <div className="w-full px-4 py-2 text-sm text-red-600 bg-red-50 border-b border-red-200">
          {error}
        </div>
      )}

      <div className="flex items-start gap-0">
        <ProjectSettings projectDetails={projectDetail} />

        <ProjectCanvas />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
