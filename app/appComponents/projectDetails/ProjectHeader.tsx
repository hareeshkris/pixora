import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { settingsContext } from "@/context/settingContext";
import axios from "axios";
import { Loader2, SaveIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

const ProjectHeader = () => {
  const { settingsDetails } = useContext(settingsContext);
  const params = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState<boolean>(false)

  const onHandleSave = async ()=>{
    try {
         setLoading(true);
         const response = await axios.put("/api/project", {
           projectName: settingsDetails?.projectName,
           theme: settingsDetails?.theme,
           projectId: settingsDetails?.projectId ?? params.projectId,
         });
         toast.add({ type: "success", title: "Settings updated" });
         setLoading(false);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error ?? "Internal server error")
        : "Internal server error";
      toast.add({ type: "error", title: message });
      setLoading(false);
    }
 

  }
  return (
    <div className="w-full py-2 bg-white">
      <div className="px-10 mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="text-2xl font-bold shrink-0">
            <Image
              src="/logos/pixora-logo-large.svg"
              alt="Logo"
              width={100}
              height={40}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={onHandleSave}
              className="cursor-pointer"
              variant="default"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <SaveIcon className="size-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
