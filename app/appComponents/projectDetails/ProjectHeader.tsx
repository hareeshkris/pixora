import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import Image from "next/image";

const ProjectHeader = () => {
  return (
    <div className="w-full py-2 border-b bg-secondary/5">
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
            <Button className="cursor-pointer" variant="default">
              <SaveIcon className="size-4" /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
