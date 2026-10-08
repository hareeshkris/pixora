// Single source of truth for canvas frame geometry.
// ProjectCanvas AND the loading skeletons both import from here,
// so placeholders sit at the exact position/size of the real frames.

export const CANVAS_TRANSFORM = {
  initialScale: 0.7,
  minScale: 0.7,
  maxScale: 3,
  initialPositionX: 200,
  initialPositionY: 100,
} as const;

export type CanvasLayout = {
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
  gap: number;
};

export function getCanvasLayout(isMobile: boolean): CanvasLayout {
  return isMobile
    ? { isMobile, screenWidth: 400, screenHeight: 820, gap: 30 }
    : { isMobile, screenWidth: 1400, screenHeight: 900, gap: 50 };
}

export function getScreenX(
  index: number,
  layout: Pick<CanvasLayout, "screenWidth" | "gap">,
) {
  return index * (layout.screenWidth + layout.gap);
}

