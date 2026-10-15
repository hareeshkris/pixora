import { htmlWrapper, THEMES, themeToCssVars } from "@/app/store";
import { projectDetailType } from "@/config/types";
import { GripHorizontal } from "lucide-react";
import { Rnd } from "react-rnd";
import { ScreenSkeleton } from "./ProjectSkeletons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { settingsContext } from "@/context/settingContext";
import ScreenHandler from "./ScreenHandler";
const ProjectScreen = ({
  x,
  y,
  screen,
  width,
  height,
  setPanningEnabled,
  projectDetail,
  isLoading = false,
  screenName,
  screenId,
}: {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  screen?: string | undefined;
  width: number;
  height: number;
  projectDetail: projectDetailType | undefined;
  isLoading?: boolean;
  screenId?: string | undefined;
  screenName?: string;
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { settingsDetails } = useContext(settingsContext);

  const theme = THEMES[settingsDetails?.theme ?? projectDetail?.theme ?? ""];
  const [size, setSize] = useState({ width, height });
  useEffect(() => {
    setSize({ width, height });
  }, [height, width]);
  const html = htmlWrapper({ theme, screen });
  const measureIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerH = 40; // drag bar height
      const htmlEl = doc.documentElement;
      const body = doc.body;

      // ✅ choose the largest plausible height
      const contentH = Math.max(
        htmlEl?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
        htmlEl?.offsetHeight ?? 0,
        body?.offsetHeight ?? 0,
      );

      // optional min/max clamps
      const next = Math.min(Math.max(contentH + headerH, 160), 2000);

      setSize((s) =>
        Math.abs(s.height - next) > 2 ? { ...s, height: next } : s,
      );
    } catch {
      // if sandbox/origin blocks access, we can't measure
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let observer: any;
    let timers: any = [];

    const onLoad = () => {
      measureIframeHeight();

      // ✅ observe DOM changes inside iframe
      const doc = iframe.contentDocument;
      if (!doc) return;

      observer?.disconnect();
      observer = new MutationObserver(() => measureIframeHeight());
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      // ✅ re-check a few times for fonts/images/tailwind async layout
      timers.forEach(clearTimeout);
      timers = [50, 200, 600].map((ms) =>
        window.setTimeout(measureIframeHeight, ms),
      );
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", measureIframeHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measureIframeHeight);
      observer?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [measureIframeHeight, html]);
  return (
    <div>
      <Rnd
        default={{
          x,
          y,
          width: width,
          height: height,
        }}
        enableResizing={{
          bottomLeft: true,
          bottomRight: true,
        }}
        size={size}
        dragHandleClassName="drag-handle"
        onDragStart={() => setPanningEnabled(false)}
        onDragStop={() => setPanningEnabled(true)}
        onResizeStart={() => setPanningEnabled(false)}
        onResizeStop={({ _, __, ref, ___, pos }: any) => {
          setPanningEnabled(true);
          setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        }}
      >
        <div className="drag-handle cursor-grabbing items-center bg-white p-3 rounded-t-md text-sm">
          <ScreenHandler
            iframeRef={iframeRef}
            theme={theme}
            screenName={screenName}
            screenCode={screen}
            screenId={screenId}
            projectId={projectDetail?.projectId}
          />
        </div>
        {isLoading ? (
          <div className="w-full h-[calc(100%-40px)] bg-white">
            <ScreenSkeleton
              width="100%"
              height="100%"
              screenName={screenName}
              isMobile={projectDetail?.device === "mobile"}
              className="rounded-none border-0 shadow-none"
            />
          </div>
        ) : (
          <div className="relative w-full h-[calc(100%-40px)] overflow-auto bg-white">
            <iframe
              sandbox="allow-same-origin allow-scripts"
              srcDoc={html}
              ref={iframeRef}
              title={screenName ?? "Generated screen"}
              className="w-full min-h-full"
            ></iframe>
          </div>
        )}
      </Rnd>
    </div>
  );
};

export default ProjectScreen;
