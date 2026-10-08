import { themeToCssVars } from "@/app/store";
import { projectDetailType } from "@/config/types";
import { GripHorizontal } from "lucide-react";
import { Rnd } from "react-rnd";
import { ScreenSkeleton } from "./ProjectSkeletons";
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
    ${themeToCssVars(projectDetail?.theme)}
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
        dragHandleClassName="drag-handle"
        onDragStart={() => setPanningEnabled(false)}
        onDragStop={() => setPanningEnabled(true)}
        onResizeStart={() => setPanningEnabled(false)}
        onResizeStop={() => setPanningEnabled(true)}
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
