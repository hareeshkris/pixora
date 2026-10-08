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
      "Design a complete travel planning application that helps users discover destinations, create trips, build day-by-day itineraries, organize flights and hotel bookings, save places to visit, manage travel expenses, and track upcoming activities. Include screens for destination discovery, trip overview, itinerary planning, booking details, saved places, expenses, notifications, and user profile.",
  },

  // {
  //   icon: "📚",
  //   title: "AI Learning Platform",
  //   description:
  //     "Design an AI-powered learning platform where users can discover courses, enroll in learning paths, watch lessons, read study materials, complete quizzes and assignments, track their learning progress, and receive personalized recommendations from AI. Include screens for course discovery, course details, video lessons, AI tutor, quizzes, progress dashboard, achievements, notifications, and profile.",
  // },

  {
    icon: "💳",
    title: "Finance Tracker",
    description:
      "Design a modern personal finance management application that helps users track income, expenses, budgets, savings, subscriptions, and financial goals. Users should be able to view spending analytics, categorize transactions, set monthly budgets, monitor account balances, and receive useful financial insights. Include screens for dashboard, transactions, expense details, budgets, analytics, savings goals, subscriptions, notifications, and profile.",
  },

  {
    icon: "🛒",
    title: "E-Commerce Store",
    description:
      "Design a complete modern e-commerce shopping application where users can discover products, search and filter items, view detailed product information, select variants, add products to their cart and wishlist, complete checkout, track orders, and manage their account. Include screens for home, product categories, search results, product details, wishlist, cart, checkout, payment, order tracking, order history, and profile.",
  },

  {
    icon: "📅",
    title: "Smart To-Do Planner",
    description:
      "Design a smart productivity and task management application that helps users organize their daily work, create tasks, set priorities and deadlines, manage projects, and track their productivity. Include AI-powered task suggestions and smart planning features that help users organize their schedule. Create screens for dashboard, task list, task creation, calendar, project details, priorities, productivity analytics, reminders, and user profile.",
  },

  {
    icon: "🍔",
    title: "Food Delivery App",
    description:
      "Design a modern food delivery application that allows users to discover nearby restaurants, browse menus, search for dishes, customize meals, add items to a cart, place orders, make payments, and track deliveries in real time. Include screens for home, restaurant discovery, restaurant details, menu, food item details, cart, checkout, payment, live order tracking, order history, favorites, offers, and profile.",
  },

  // {
  //   icon: "🧒",
  //   title: "Kids Learning App",
  //   description:
  //     "Design a colorful and engaging educational application for children that makes learning fun through interactive lessons, games, quizzes, stories, and activities. Parents should also be able to monitor their child's learning progress, completed activities, achievements, and daily learning time. Include screens for child dashboard, subjects, lesson details, interactive activities, quizzes, rewards, achievements, progress reports, parent dashboard, notifications, and profile.",
  // },
];

export const THEMES: Record<string, any> = {
  SKYLINE: {
    background: "#F7F9FC",
    foreground: "#172033",

    card: "#FFFFFF",
    cardForeground: "#172033",

    popover: "#FFFFFF",
    popoverForeground: "#172033",

    primary: "#4F46E5",
    primaryRgb: "79, 70, 229",
    primaryForeground: "#FFFFFF",

    secondary: "#EEF2FF",
    secondaryForeground: "#3730A3",

    muted: "#F1F3F7",
    mutedForeground: "#667085",

    accent: "#E0E7FF",
    accentForeground: "#3730A3",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#E2E6EF",
    input: "#D9DEE8",
    ring: "#4F46E5",
  },

  OCEAN_BREEZE: {
    background: "#F4FAFC",
    foreground: "#102A35",

    card: "#FFFFFF",
    cardForeground: "#102A35",

    popover: "#FFFFFF",
    popoverForeground: "#102A35",

    primary: "#0891B2",
    primaryRgb: "8, 145, 178",
    primaryForeground: "#FFFFFF",

    secondary: "#E6F7FB",
    secondaryForeground: "#0E7490",

    muted: "#EEF6F8",
    mutedForeground: "#64808A",

    accent: "#CFFAFE",
    accentForeground: "#155E75",

    destructive: "#E11D48",
    destructiveForeground: "#FFFFFF",

    border: "#D8E8EC",
    input: "#CBDDE2",
    ring: "#0891B2",
  },

  LAVENDER_MIST: {
    background: "#FAF9FF",
    foreground: "#27233A",

    card: "#FFFFFF",
    cardForeground: "#27233A",

    popover: "#FFFFFF",
    popoverForeground: "#27233A",

    primary: "#7C3AED",
    primaryRgb: "124, 58, 237",
    primaryForeground: "#FFFFFF",

    secondary: "#F3E8FF",
    secondaryForeground: "#6B21A8",

    muted: "#F5F3FA",
    mutedForeground: "#746F85",

    accent: "#EDE9FE",
    accentForeground: "#6D28D9",

    destructive: "#E11D48",
    destructiveForeground: "#FFFFFF",

    border: "#E7E1F2",
    input: "#DDD6E9",
    ring: "#7C3AED",
  },

  PEACH_BLOSSOM: {
    background: "#FFF9F7",
    foreground: "#30201D",

    card: "#FFFFFF",
    cardForeground: "#30201D",

    popover: "#FFFFFF",
    popoverForeground: "#30201D",

    primary: "#EA580C",
    primaryRgb: "234, 88, 12",
    primaryForeground: "#FFFFFF",

    secondary: "#FFF1EB",
    secondaryForeground: "#C2410C",

    muted: "#FDF3EF",
    mutedForeground: "#8A6F68",

    accent: "#FFEDD5",
    accentForeground: "#9A3412",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#F0DDD5",
    input: "#E8D1C8",
    ring: "#EA580C",
  },

  MINT_FRESH: {
    background: "#F5FBF8",
    foreground: "#172B25",

    card: "#FFFFFF",
    cardForeground: "#172B25",

    popover: "#FFFFFF",
    popoverForeground: "#172B25",

    primary: "#059669",
    primaryRgb: "5, 150, 105",
    primaryForeground: "#FFFFFF",

    secondary: "#E8F8F1",
    secondaryForeground: "#047857",

    muted: "#EFF7F3",
    mutedForeground: "#668078",

    accent: "#D1FAE5",
    accentForeground: "#065F46",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#D8E9E1",
    input: "#C9DED5",
    ring: "#059669",
  },

  ROSE_CREAM: {
    background: "#FFF8FA",
    foreground: "#321F27",

    card: "#FFFFFF",
    cardForeground: "#321F27",

    popover: "#FFFFFF",
    popoverForeground: "#321F27",

    primary: "#DB2777",
    primaryRgb: "219, 39, 119",
    primaryForeground: "#FFFFFF",

    secondary: "#FCE7F3",
    secondaryForeground: "#BE185D",

    muted: "#F9F1F4",
    mutedForeground: "#866F78",

    accent: "#FBCFE8",
    accentForeground: "#9D174D",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#EEDBE3",
    input: "#E3CBD5",
    ring: "#DB2777",
  },

  SUNLIT: {
    background: "#FFFCF4",
    foreground: "#2D281B",

    card: "#FFFFFF",
    cardForeground: "#2D281B",

    popover: "#FFFFFF",
    popoverForeground: "#2D281B",

    primary: "#D97706",
    primaryRgb: "217, 119, 6",
    primaryForeground: "#FFFFFF",

    secondary: "#FEF3C7",
    secondaryForeground: "#92400E",

    muted: "#FAF6E9",
    mutedForeground: "#81785F",

    accent: "#FDE68A",
    accentForeground: "#78350F",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#EDE3C8",
    input: "#E1D5B7",
    ring: "#D97706",
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

export function isScreenCodeComplete(code: unknown) {
  if (typeof code !== "string") return false;
  const trimmed = code.trim();
  if (trimmed.length < 300) return false;
  const openDivs = (trimmed.match(/<div[\s>]/gi) ?? []).length;
  const closeDivs = (trimmed.match(/<\/div\s*>/gi) ?? []).length;
  if (openDivs === 0 || openDivs !== closeDivs) return false;
  if (!/<\/[a-z][\w-]*\s*>$/i.test(trimmed)) return false;
  // Ends mid-tag, e.g. `</button` or `placeholder="Search...`
  if (/<\/?[a-z][^>]*$/i.test(trimmed)) return false;
  return true;
}

export function themeToCssVars(theme: string | any) {
  const t =
    typeof theme === "string"
      ? THEMES[theme]
      : theme && typeof theme === "object" && theme.background
        ? theme
        : undefined;

  // Fall back to first theme so iframe never gets `--background: undefined`
  // (happens when projectDetail is still loading or theme is an unknown name).
  const resolved = t ?? THEMES[THEME_OPTIONS[0].value];

  if (!resolved) return "";

  return `
    :root {
      --background: ${resolved.background};
      --foreground: ${resolved.foreground};

      --card: ${resolved.card};
      --card-foreground: ${resolved.cardForeground};

      --popover: ${resolved.popover};
      --popover-foreground: ${resolved.popoverForeground};

      --primary: ${resolved.primary};
      --primary-rgb: ${resolved.primaryRgb};
      --primary-foreground: ${resolved.primaryForeground};

      --secondary: ${resolved.secondary};
      --secondary-foreground: ${resolved.secondaryForeground};

      --muted: ${resolved.muted};
      --muted-foreground: ${resolved.mutedForeground};

      --accent: ${resolved.accent};
      --accent-foreground: ${resolved.accentForeground};

      --destructive: ${resolved.destructive};
      --destructive-foreground: ${resolved.destructiveForeground};

      --border: ${resolved.border};
      --input: ${resolved.input};
      --ring: ${resolved.ring};

      --radius: ${resolved.radius ?? "0.5rem"};
    }
  `;
}