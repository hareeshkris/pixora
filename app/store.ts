export type Suggestion = {
  icon: string;
  title: string;
  description: string;
};

export const suggestions: Suggestion[] = [
  {
    icon: "✈️",
    title: "Travel Planner App",
    description:
      "Create a travel planner app where users can plan trips, organize destinations, manage itineraries, and track their travel activities.",
  },
  {
    icon: "📚",
    title: "AI Learning Platform",
    description:
      "Create an AI-powered learning platform where users can discover courses, learn with personalized content, track their progress, and get AI assistance.",
  },
  {
    icon: "💳",
    title: "Finance Tracker",
    description:
      "Create a personal finance tracker that helps users manage income and expenses, set budgets, monitor spending, and visualize their financial activity.",
  },
  {
    icon: "🛒",
    title: "E-Commerce Store",
    description:
      "Create a modern e-commerce store where users can browse products, search and filter items, add products to a cart, and complete purchases.",
  },
  {
    icon: "📅",
    title: "Smart To-Do Planner",
    description:
      "Create a smart to-do planner that helps users organize tasks, set priorities and deadlines, track progress, and manage their daily schedule.",
  },
//   {
//     icon: "🍔",
//     title: "Food Delivery App",
//     description:
//       "Create a food delivery app where users can discover restaurants, browse menus, add food to their cart, place orders, and track deliveries.",
//   },
//   {
//     icon: "🧒",
//     title: "Kids Learning App",
//     description:
//       "Create an interactive kids learning app with fun educational activities, games, lessons, quizzes, and progress tracking for young learners.",
//   },
];

export const THEMES: Record<string, any> = {
  NEON_FLUX: {
    background: "#080A12",
    foreground: "#F7F8FF",

    card: "#101421",
    cardForeground: "#F7F8FF",

    popover: "#101421",
    popoverForeground: "#F7F8FF",

    primary: "#FF2DAA",
    primaryRgb: "255, 45, 170",
    primaryForeground: "#FFFFFF",

    secondary: "#25102A",
    secondaryForeground: "#FFD9F2",

    muted: "#171A27",
    mutedForeground: "#A7ADBE",

    accent: "#7CFF00",
    accentForeground: "#071000",

    destructive: "#FF3B30",
    destructiveForeground: "#FFFFFF",

    border: "#352040",
    input: "#352040",
    ring: "#FF2DAA",
  },

  ELECTRIC_MINT: {
    background: "#071210",
    foreground: "#F2FFFB",

    card: "#0D1D19",
    cardForeground: "#F2FFFB",

    popover: "#0D1D19",
    popoverForeground: "#F2FFFB",

    primary: "#00E5A0",
    primaryRgb: "0, 229, 160",
    primaryForeground: "#03130E",

    secondary: "#103B31",
    secondaryForeground: "#C8FFF0",

    muted: "#12251F",
    mutedForeground: "#8EB7AA",

    accent: "#00D9FF",
    accentForeground: "#001114",

    destructive: "#FF4664",
    destructiveForeground: "#FFFFFF",

    border: "#1D4D40",
    input: "#1D4D40",
    ring: "#00E5A0",
  },

  ELECTRIC_CANDY: {
    background: "#120A18",
    foreground: "#FFF8FF",

    card: "#1D1027",
    cardForeground: "#FFF8FF",

    popover: "#1D1027",
    popoverForeground: "#FFF8FF",

    primary: "#D946EF",
    primaryRgb: "217, 70, 239",
    primaryForeground: "#FFFFFF",

    secondary: "#361442",
    secondaryForeground: "#F9D8FF",

    muted: "#25152F",
    mutedForeground: "#B89BC2",

    accent: "#FFEA00",
    accentForeground: "#171000",

    destructive: "#FF3864",
    destructiveForeground: "#FFFFFF",

    border: "#50215D",
    input: "#50215D",
    ring: "#D946EF",
  },

  CYBER_LIME: {
    background: "#090D08",
    foreground: "#F8FFF3",

    card: "#121A0F",
    cardForeground: "#F8FFF3",

    popover: "#121A0F",
    popoverForeground: "#F8FFF3",

    primary: "#B7F000",
    primaryRgb: "183, 240, 0",
    primaryForeground: "#0A1000",

    secondary: "#25350E",
    secondaryForeground: "#E8FFC2",

    muted: "#181F13",
    mutedForeground: "#A5B58D",

    accent: "#00F5D4",
    accentForeground: "#001410",

    destructive: "#FF4057",
    destructiveForeground: "#FFFFFF",

    border: "#35491A",
    input: "#35491A",
    ring: "#B7F000",
  },

  CORAL_POP: {
    background: "#12090A",
    foreground: "#FFF8F7",

    card: "#211113",
    cardForeground: "#FFF8F7",

    popover: "#211113",
    popoverForeground: "#FFF8F7",

    primary: "#FF4F6D",
    primaryRgb: "255, 79, 109",
    primaryForeground: "#FFFFFF",

    secondary: "#3A171C",
    secondaryForeground: "#FFDDE2",

    muted: "#281518",
    mutedForeground: "#C39DA4",

    accent: "#FFB800",
    accentForeground: "#1A1000",

    destructive: "#FF1744",
    destructiveForeground: "#FFFFFF",

    border: "#54252D",
    input: "#54252D",
    ring: "#FF4F6D",
  },

  ARCTIC_BLOOM: {
    background: "#071014",
    foreground: "#F3FCFF",

    card: "#0D1A20",
    cardForeground: "#F3FCFF",

    popover: "#0D1A20",
    popoverForeground: "#F3FCFF",

    primary: "#00B8D9",
    primaryRgb: "0, 184, 217",
    primaryForeground: "#001216",

    secondary: "#10333C",
    secondaryForeground: "#C8F7FF",

    muted: "#12242A",
    mutedForeground: "#91B5BE",

    accent: "#FF4FD8",
    accentForeground: "#1A0013",

    destructive: "#FF4568",
    destructiveForeground: "#FFFFFF",

    border: "#1D4B57",
    input: "#1D4B57",
    ring: "#00B8D9",
  },
};

export const THEME_NAMES = Object.keys(THEMES);

export const formatThemeName = (name: string) =>
  name
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const THEME_LABELS = THEME_NAMES.map(formatThemeName);

export const THEME_OPTIONS = THEME_NAMES.map((name) => ({
  value: name,
  label: formatThemeName(name),
}));
