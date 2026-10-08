"use client";

import ProjectCanvas from "@/app/appComponents/projectDetails/ProjectCanvas";
import ProjectHeader from "@/app/appComponents/projectDetails/ProjectHeader";
import ProjectSettings from "@/app/appComponents/projectDetails/ProjectSettings";
import { ProjectDetailSkeleton } from "@/app/appComponents/projectDetails/ProjectSkeletons";
import { isScreenCodeComplete } from "@/app/store";
import { projectDetailType, screenConfigType } from "@/config/types";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { getCanvasLayout } from "@/app/appComponents/projectDetails/canvasLayout";
import { settingsContext } from "@/context/settingContext";

const ProjectDetailPage = () => {
  const [projectDetail, setProjectDetail] = useState<projectDetailType>();

  const [screenConfig, setScreenConfig] = useState<screenConfigType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  
  const { setSettingsDetails } =useContext(settingsContext);

  const params = useSearchParams();
  const routeParams = useParams();
  const deviceFromUrl = params.get("device") as "website" | "mobile" | null;
  const isMobile = deviceFromUrl
    ? deviceFromUrl === "mobile"
    : projectDetail?.device === "mobile";
  const layout = getCanvasLayout(isMobile);
  const projectIdParam = routeParams.projectId;
  const projectId = Array.isArray(projectIdParam)
    ? projectIdParam[0]
    : projectIdParam;

  const configGenerationStarted = useRef(false);
  const uiGenerationStarted = useRef(false);
  const activeProjectId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!projectId) return;
    activeProjectId.current = projectId;
    configGenerationStarted.current = false;
    uiGenerationStarted.current = false;
    setProjectDetail(undefined);
    setScreenConfig([]);

    getProjectDetails();

    return () => {
      activeProjectId.current = undefined;
    };
  }, [projectId]);

  const fetchProject = async () => {
    const response = await axios.get(`/api/project?projectId=${projectId}`);

    return {
      detail: response.data.projectDetail as projectDetailType | undefined,
      screens: (response.data.screenConfig ?? []) as screenConfigType[],
    };
  };

  const getProjectDetails = async () => {
    if (!projectId) return;

    setLoading(true);
    setError(undefined);

    try {
      const { detail, screens } = await fetchProject();

      if (activeProjectId.current !== projectId) return;

      if (!detail) {
        setError("Project not found or you don't have access to it");
        return;
      }

      setProjectDetail(detail);
      setScreenConfig(screens);
      setSettingsDetails(detail);

      if (screens.length === 0 && !configGenerationStarted.current) {
        configGenerationStarted.current = true;

        const generatedConfig = await generateScreenConfig(detail);

        if (activeProjectId.current !== projectId) return;

        if (generatedConfig?.screens) {
   
          const refreshed = await fetchProject();

          if (activeProjectId.current !== projectId) return;

          setProjectDetail(refreshed.detail ?? detail);
          setScreenConfig(refreshed.screens);
          setSettingsDetails(refreshed.detail ?? detail)
        }
      }
    } catch (err) {
      if (activeProjectId.current !== projectId) return;

      console.error("Project loading error:", err);

      setError(
        axios.isAxiosError(err)
          ? (err.response?.data?.error ?? err.message)
          : "Failed to load project",
      );
    } finally {
      if (activeProjectId.current === projectId) setLoading(false);
    }
  };

  const generateScreenConfig = async (detail: projectDetailType) => {
    try {
      const response = await axios.post("/api/generate-config", {
        projectId,
        deviceType: detail.device,
        userInput: detail.userInput,
      });

      return response.data.jsonAIResult;
    } catch (err) {
      if (activeProjectId.current !== projectId) return null;

      console.error("Failed to generate screen config:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to generate screen config",
        );
      } else {
        setError("Failed to generate screen config");
      }

      return null;
    }
  };

  useEffect(() => {
    if (!projectDetail || !screenConfig.length) return;
    if (!projectId) return;
    if (projectDetail.projectId !== projectId) return;
    if (uiGenerationStarted.current) return;
    if (!screenConfig.some((screen) => !isScreenCodeComplete(screen.code)))
      return;

    uiGenerationStarted.current = true;

    generateUIScreen();
  }, [projectDetail, screenConfig, projectId]);

  const generateUIScreen = async () => {
    setLoading(true);

    const failedScreens: string[] = [];

    try {
      for (const screen of screenConfig) {
        if (isScreenCodeComplete(screen.code)) continue;
        if (activeProjectId.current !== projectId) return;

        try {
          const response = await axios.post("/api/generate-screen", {
            projectId,
            screenId: screen.screenId,
            screenName: screen.screenName,
            purpose: screen.purpose,
            screenDescription: screen.screenDescription,
            theme: projectDetail?.theme,
            projectVisualDescription: projectDetail?.projectVisualDescription,
          });

          if (activeProjectId.current !== projectId) return;

          const updatedScreen = response.data as screenConfigType | null;

          if (!isScreenCodeComplete(updatedScreen?.code)) {
            failedScreens.push(screen.screenName);
            continue;
          }

          setScreenConfig((prev) =>
            prev.map((item) =>
              item.screenId === screen.screenId
                ? { ...item, ...updatedScreen }
                : item,
            ),
          );
        } catch (screenError) {
          console.error(
            `Screen generation failed for "${screen.screenName}":`,
            screenError,
          );

          const reason = axios.isAxiosError(screenError)
            ? screenError.response?.data?.error || screenError.message
            : null;

          failedScreens.push(
            reason ? `${screen.screenName} (${reason})` : screen.screenName,
          );
        }
      }

      if (failedScreens.length) {
        uiGenerationStarted.current = false;

        setError(`Failed to generate screen(s): ${failedScreens.join(", ")}`);
      }
    } finally {
      if (activeProjectId.current === projectId) setLoading(false);
    }
  };

  const isInitialLoading = loading && screenConfig.length === 0;

  return (
    <div className="w-full flex flex-col gap-0">
      {isInitialLoading ? (
        <ProjectDetailSkeleton screenCount={2} isMobile={isMobile} />
      ) : (
        <>
          <ProjectHeader />

          {error && (
            <div className="w-full px-4 py-2 text-sm text-red-600 bg-red-50 border-b border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-start gap-0">
            <ProjectSettings projectDetails={projectDetail} />

            <ProjectCanvas
              projectDetails={projectDetail}
              screenConfigs={screenConfig}
              loading={loading}
              layout={layout}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailPage;
