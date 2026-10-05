"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PanelsTopLeft, Send } from "lucide-react";
import { Suggestion, suggestions } from "@/app/store";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
const items = [
  { label: "Website", value: "website" },
  { label: "Mobile", value: "mobile" },
];

const Hero = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"website" | "mobile">(
    "website",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUser();
  const route = useRouter();

  const createProject = async () => {
    if (!user.isSignedIn) {
      route.push("/sign-in");
      return;
    }

    if (!userInput || userInput.trim() === "") {
      alert("Please enter a prompt");
      return;
    }
    setLoading(true);
    const projectId = crypto.randomUUID();

    const response = await axios.post("/api/project", {
      userInput: userInput,
      device: selectedType,
      projectId: projectId,
    });

    console.log(response.data);
    setLoading(false);
  };

  return (
    <div className="w-full py-30 min-h-[calc(100dvh-70px)]">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="heading-1 text-center mb-6">
              Create Stunning Visuals <br />
              <span>with AI-Powered Design</span>
            </h1>
            <p className="text-xl text-balance text-center text-gray-800">
              Bring your imagination to life with AI-generated visuals, creative
              assets, and <br /> professional designs in seconds.
            </p>
          </div>
          <div className="grid w-full max-w-3xl mx-auto gap-6">
            <InputGroup className="bg-white rounded-xl z-10 shadow-[0px_20px_48px_-12px_#00390E1A]">
              <InputGroupTextarea
                data-slot="input-group-control"
                className="flex  field-sizing-content min-h-32 w-full resize-none rounded-md bg-transparent px-4 py-4 text-base  outline-none md:text-base placeholder:italic placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="Futuristic sustainable electric vehicle landing page with sleek 3D renders, neon green accents, and interactive specs..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <InputGroupAddon align="block-end">
                <Select
                  items={items}
                  value={selectedType}
                  onValueChange={(value) =>
                    setSelectedType(value as "website" | "mobile")
                  }
                >
                  <SelectTrigger className="h-9 w-[180px] justify-start gap-2  px-3 font-medium text-foreground shadow-none transition-colors hover:bg-muted focus-visible:border-transparent focus-visible:ring-0 [&>svg:last-child]:ml-auto">
                    <PanelsTopLeft
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <InputGroupButton
                  className="ml-auto"
                  size="sm"
                  variant="default"
                  onClick={createProject}
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 flex gap-4 justify-center flex-wrap">
            {suggestions.map((suggestion: Suggestion) => (
              <span
                key={suggestion.title}
                onClick={() => setUserInput(suggestion.description)}
                className="text-secondary *:mr-2 rounded-2xl bg-secondary/10 px-2.5 border border-secondary/10 hover:border-secondary/50 transition-all duration-300 cursor-pointer py-1 text-xs font-medium "
              >
                {suggestion.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
