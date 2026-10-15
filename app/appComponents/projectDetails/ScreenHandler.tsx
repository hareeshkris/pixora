"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  Code2,
  Copy,
  Download,
  GripHorizontal,
  Loader2,
  SparklesIcon,
  TrashIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "@/components/ui/toast";
import { useContext, useState } from "react";
import { htmlWrapper } from "@/app/store";
import html2canvas from "html2canvas";
import axios from "axios";
import { RefreshDataContext } from "@/context/refreshDataContext";
import { Textarea } from "@/components/ui/textarea";

type screenHandlerProps = {
  screenName: string | undefined;
  theme: string;
  screenCode: string | undefined;
  iframeRef?: any;
  projectId: string | undefined;
  screenId: string | undefined;
};

const ScreenHandler = ({
  screenName,
  screenCode,
  theme,
  iframeRef,
  projectId,
  screenId,
}: screenHandlerProps) => {
  const [copyIcon, setCopyIcon] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const htmlCode = htmlWrapper({ theme, screen: screenCode });
  const [editUserInput, setEditUserInput] = useState<string>("");
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const copyCode = async () => {
    if (!htmlCode) return;

    await navigator.clipboard.writeText(htmlCode);

    toast.add({
      type: "success",
      title: "HTML code copied",
    });

    setCopyIcon(true);

    setTimeout(() => {
      setOpen(false);

      setTimeout(() => {
        setCopyIcon(false);
      }, 300);
    }, 700);
  };

  const takeIframeScreenshot = async () => {
    if (isDownloading) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    setIsDownloading(true);

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const body = doc.body;

      await new Promise((res) => requestAnimationFrame(res));

      const canvas = await html2canvas(body, {
        backgroundColor: null,
        useCORS: true,
        scale: window.devicePixelRatio || 1,
        onclone: (clonedDocument) => {
          const style = clonedDocument.createElement("style");
          style.textContent = `
            *,
            *::before,
            *::after {
              box-shadow: none !important;
              text-shadow: none !important;
            }
          `;
          clonedDocument.head.appendChild(style);
        },
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `screenshot-${Date.now()}.png`;
      link.click();

      toast.add({
        type: "success",
        title: "Screenshot downloaded",
      });
    } catch (err) {
      console.error("Screenshot failed:", err);
      toast.add({
        type: "error",
        title: "Screenshot failed",
        description: "Something went wrong while capturing the screen.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const OnDelete = async () => {
    const response = await axios.delete(
      `/api/generate-config?projectId=${projectId}&screenId=${screenId}`,
    );
    toast.add({
      type: "success",
      title: "Screen Deleted",
    });
    setRefreshData({ method: "screenConfig", date: Date.now() });
  };

  const editScreen = async () => {
    if (isGenerating || !editUserInput.trim()) return;

    setIsGenerating(true);
    try {
      await axios.post("/api/edit-screen", {
        projectId,
        screenId,
        userInput: editUserInput,
        oldCode: screenCode,
      });
      setRefreshData({ method: "screenConfig", date: Date.now() });
      toast.add({
        type: "update",
        title: "Screen updated",
      });
    } catch (error) {
      const message = axios.isAxiosError<{
        error?: string;
        detail?: string;
        statusCode?: number | null;
      }>(error)
        ? [
            error.response?.data?.error ?? error.message,
            error.response?.data?.detail,
            error.response?.data?.statusCode
              ? `HTTP ${error.response.data.statusCode}`
              : undefined,
          ]
            .filter(Boolean)
            .join(" — ")
        : error instanceof Error
          ? error.message
          : "Please try again.";

      toast.add({
        type: "error",
        title: "Could not update screen",
        description: message,
      });
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <GripHorizontal className="size-5" />
        <span>{screenName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={takeIframeScreenshot}
          className="cursor-pointer"
          variant="ghost"
          size="icon-sm"
          disabled={isDownloading}
          aria-label={
            isDownloading ? "Downloading screenshot" : "Download screenshot"
          }
          title={isDownloading ? "Downloading…" : "Download screenshot"}
        >
          {isDownloading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download />
          )}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="cursor-pointer" variant="ghost" size="icon-sm">
              <Code2 />
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[540px]">
            <DialogHeader>
              <DialogTitle>HTML + Tailwind CSS code</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              <div className="max-h-[600px] max-w-[505px] overflow-auto rounded-md scrollbar-none">
                <SyntaxHighlighter
                  language="javascript"
                  style={docco}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    overflowX: "auto",
                    whiteSpace: "pre",
                    borderRadius: "8px",
                  }}
                >
                  {htmlCode ?? ""}
                </SyntaxHighlighter>
              </div>
            </DialogDescription>

            <DialogFooter>
              <Button className={"cursor-pointer"} onClick={copyCode} size="sm">
                <span
                  className={`transition-all duration-300 ${
                    copyIcon
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-100 rotate-0 opacity-100"
                  }`}
                >
                  {copyIcon ? (
                    <Check className="animate-in zoom-in-50 duration-300" />
                  ) : (
                    <Copy className="animate-in zoom-in-50 duration-300" />
                  )}
                </span>

                {copyIcon ? "Copied" : "Copy"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger render={<Button variant="ghost" />}>
            <SparklesIcon />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <Textarea
                onChange={(e) => setEditUserInput(e.target.value)}
                value={editUserInput}
                placeholder="What changes you have to make... "
              />
              <Button
                onClick={() => editScreen()}
                size={"sm"}
                disabled={isGenerating || !editUserInput.trim()}
              >
                {isGenerating ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <SparklesIcon className="size-3" />
                )}
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => OnDelete()}
          className="cursor-pointer"
          variant="destructive"
          size="icon-sm"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default ScreenHandler;
