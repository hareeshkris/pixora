import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ProjectScreen from "./ProjectScreen";
import { useState } from "react";
import { isScreenCodeComplete } from "@/app/store";
import { projectDetailType, screenConfigType } from "@/config/types";
import { CanvasSkeletonViewport } from "./ProjectSkeletons";
import { CANVAS_TRANSFORM, getCanvasLayout, getScreenX } from "./canvasLayout";

type props = {
  projectDetails: projectDetailType | undefined;
  screenConfigs: screenConfigType[];
  loading: boolean;
  layout: ReturnType<typeof getCanvasLayout>;
};
const ProjectCanvas = ({ projectDetails, screenConfigs, loading, layout }: props) => {
  const [panningEnabled, setPanningEnabled] = useState<boolean>(true);
  const { screenWidth, screenHeight } = layout;
  return (
    <div
      className="flex-1 bg-gray-200 h-[calc(100vh-49px)] cursor-grab "
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #ccc 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <TransformWrapper
        initialScale={CANVAS_TRANSFORM.initialScale}
        minScale={CANVAS_TRANSFORM.minScale}
        maxScale={CANVAS_TRANSFORM.maxScale}
        initialPositionX={CANVAS_TRANSFORM.initialPositionX}
        initialPositionY={CANVAS_TRANSFORM.initialPositionY}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        panning={{ disabled: !panningEnabled }}
        doubleClick={{ disabled: false }}
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          {loading && screenConfigs.length === 0 ? (
            <CanvasSkeletonViewport
              count={layout.isMobile ? 1 : 2}
              layout={layout}
            />
          ) : (
            screenConfigs.map((screen: any, index: number) => (
              <ProjectScreen
                key={screen.screenId ?? index}
                x={getScreenX(index, layout)}
                width={screenWidth}
                height={screenHeight}
                y={0}
                setPanningEnabled={setPanningEnabled}
                screen={screen.code}
                projectDetail={projectDetails}
                isLoading={!isScreenCodeComplete(screen.code)}
                screenName={screen.screenName}
              />
            ))
          )}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ProjectCanvas;
