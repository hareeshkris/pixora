import { THEMES, themeToCssVars } from "@/app/store";
import { projectDetailType } from "@/config/types";
import { GripHorizontal } from "lucide-react";
import { Rnd } from "react-rnd";
import { ScreenSkeleton } from "./ProjectSkeletons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { settingsContext } from "@/context/settingContext";
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
}: {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  screen?: string | undefined;
  width: number;
  height: number;
  projectDetail: projectDetailType | undefined;
  isLoading?: boolean;
  screenName?: string;
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { settingsDetails } = useContext(settingsContext);

  const theme = THEMES[settingsDetails?.theme ?? projectDetail?.theme ?? ""];
  const [size, setSize] = useState({ width, height });
  useEffect(() => {
    setSize({ width, height });
  }, [height, width]);
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />

  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />

  <!-- Tailwind Play CDN only (v2 static CSS removed: it has no support for
       arbitrary var() color utilities and its preflight fights v3) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
          },
          // Named colors mapped to theme vars. Prefer these over raw
          // arbitrary var() utilities: bg-background works even where values
          // with slash-opacity would be dropped by the CDN compiler.
          colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            card: "var(--card)",
            "card-foreground": "var(--card-foreground)",
            popover: "var(--popover)",
            "popover-foreground": "var(--popover-foreground)",
            primary: "var(--primary)",
            "primary-foreground": "var(--primary-foreground)",
            secondary: "var(--secondary)",
            "secondary-foreground": "var(--secondary-foreground)",
            muted: "var(--muted)",
            "muted-foreground": "var(--muted-foreground)",
            accent: "var(--accent)",
            "accent-foreground": "var(--accent-foreground)",
            border: "var(--border)",
            input: "var(--input)",
            ring: "var(--ring)",
          },
        },
      },
    };
  </script>

  <style>
    ${themeToCssVars(theme)}
    html, body {
      margin: 0;
      padding: 0;
      font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
      scrollbar-width:none;
    }
    body {
      background-color: var(--background);
      color: var(--foreground);
      scrollbar-width:none;
    }
    img { max-width: 100%; }
    /* Fallback shim: guarantees foundational theme colors even if the Tailwind
       Play CDN is blocked, slow, or offline. The CDN still handles layout /
       spacing; these plain rules only cover the var() color utilities. */
    .bg-\[var\(--background\)\] { background-color: var(--background) !important; }
    .text-\[var\(--foreground\)\] { color: var(--foreground) !important; }
    .bg-\[var\(--card\)\] { background-color: var(--card) !important; }
    .text-\[var\(--card-foreground\)\] { color: var(--card-foreground) !important; }
    .bg-\[var\(--primary\)\] { background-color: var(--primary) !important; }
    .text-\[var\(--primary-foreground\)\] { color: var(--primary-foreground) !important; }
    .bg-\[var\(--secondary\)\] { background-color: var(--secondary) !important; }
    .text-\[var\(--secondary-foreground\)\] { color: var(--secondary-foreground) !important; }
    .bg-\[var\(--muted\)\] { background-color: var(--muted) !important; }
    .text-\[var\(--muted-foreground\)\] { color: var(--muted-foreground) !important; }
    .bg-\[var\(--accent\)\] { background-color: var(--accent) !important; }
    .text-\[var\(--accent-foreground\)\] { color: var(--accent-foreground) !important; }
    .border-\[var\(--border\)\] { border-color: var(--border) !important; }
  </style>
</head>

<body>
  ${screen ?? ""}
</body>
</html>
`;
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
        <div className="drag-handle cursor-grabbing flex gap-2 justify-center items-center bg-gray-300 p-1 rounded-t-sm text-sm">
          <GripHorizontal className="size-4" />
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
