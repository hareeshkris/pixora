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
  // ---------- LIGHT THEMES ----------

  SKY_BLUE: {
    background: "#F5F9FF",
    foreground: "#0F2038",

    card: "#FFFFFF",
    cardForeground: "#0F2038",

    popover: "#FFFFFF",
    popoverForeground: "#0F2038",

    primary: "#2563EB",
    primaryRgb: "37, 99, 235",
    primaryForeground: "#FFFFFF",

    secondary: "#E5EEFF",
    secondaryForeground: "#1E40AF",

    muted: "#EEF3FA",
    mutedForeground: "#5F7089",

    accent: "#DBEAFE",
    accentForeground: "#1E3A8A",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#DCE5F2",
    input: "#CFDAEA",
    ring: "#2563EB",
  },

  TEAL_LAGOON: {
    background: "#F3FBFA",
    foreground: "#0F2A28",

    card: "#FFFFFF",
    cardForeground: "#0F2A28",

    popover: "#FFFFFF",
    popoverForeground: "#0F2A28",

    primary: "#0D9488",
    primaryRgb: "13, 148, 136",
    primaryForeground: "#FFFFFF",

    secondary: "#E0F7F4",
    secondaryForeground: "#0F766E",

    muted: "#EBF5F3",
    mutedForeground: "#5F7F7B",

    accent: "#CCFBF1",
    accentForeground: "#115E59",

    destructive: "#E11D48",
    destructiveForeground: "#FFFFFF",

    border: "#D3E8E5",
    input: "#C3DDD9",
    ring: "#0D9488",
  },

  LIME_GARDEN: {
    background: "#F9FDF2",
    foreground: "#1F2A12",

    card: "#FFFFFF",
    cardForeground: "#1F2A12",

    popover: "#FFFFFF",
    popoverForeground: "#1F2A12",

    primary: "#4D7C0F",
    primaryRgb: "77, 124, 15",
    primaryForeground: "#FFFFFF",

    secondary: "#ECFCCB",
    secondaryForeground: "#3F6212",

    muted: "#F3F7E8",
    mutedForeground: "#747F5C",

    accent: "#D9F99D",
    accentForeground: "#365314",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#E2EBCB",
    input: "#D5E0B8",
    ring: "#4D7C0F",
  },

  CORAL_REEF: {
    background: "#FFF8F6",
    foreground: "#34201E",

    card: "#FFFFFF",
    cardForeground: "#34201E",

    popover: "#FFFFFF",
    popoverForeground: "#34201E",

    primary: "#E8503A",
    primaryRgb: "232, 80, 58",
    primaryForeground: "#FFFFFF",

    secondary: "#FFEBE6",
    secondaryForeground: "#B93A27",

    muted: "#FBF1EE",
    mutedForeground: "#8A6C66",

    accent: "#FFD9D0",
    accentForeground: "#8F2A1B",

    destructive: "#B91C1C",
    destructiveForeground: "#FFFFFF",

    border: "#F2DBD5",
    input: "#E8CCC4",
    ring: "#E8503A",
  },

  CRIMSON_SILK: {
    background: "#FEF8F8",
    foreground: "#2E1717",

    card: "#FFFFFF",
    cardForeground: "#2E1717",

    popover: "#FFFFFF",
    popoverForeground: "#2E1717",

    primary: "#B91C1C",
    primaryRgb: "185, 28, 28",
    primaryForeground: "#FFFFFF",

    secondary: "#FEE2E2",
    secondaryForeground: "#991B1B",

    muted: "#F8EFEF",
    mutedForeground: "#7F6666",

    accent: "#FECACA",
    accentForeground: "#7F1D1D",

    destructive: "#7F1D1D",
    destructiveForeground: "#FFFFFF",

    border: "#EDDADA",
    input: "#E2CBCB",
    ring: "#B91C1C",
  },

  SLATE_GRAPHITE: {
    background: "#F8FAFC",
    foreground: "#0F172A",

    card: "#FFFFFF",
    cardForeground: "#0F172A",

    popover: "#FFFFFF",
    popoverForeground: "#0F172A",

    primary: "#334155",
    primaryRgb: "51, 65, 85",
    primaryForeground: "#FFFFFF",

    secondary: "#E2E8F0",
    secondaryForeground: "#1E293B",

    muted: "#F1F5F9",
    mutedForeground: "#64748B",

    accent: "#CBD5E1",
    accentForeground: "#0F172A",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#E2E8F0",
    input: "#CBD5E1",
    ring: "#334155",
  },

  FUCHSIA_POP: {
    background: "#FDF7FE",
    foreground: "#2F1633",

    card: "#FFFFFF",
    cardForeground: "#2F1633",

    popover: "#FFFFFF",
    popoverForeground: "#2F1633",

    primary: "#C026D3",
    primaryRgb: "192, 38, 211",
    primaryForeground: "#FFFFFF",

    secondary: "#FAE8FF",
    secondaryForeground: "#86198F",

    muted: "#F7EEF8",
    mutedForeground: "#7E6A82",

    accent: "#F5D0FE",
    accentForeground: "#701A75",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#EBD9EE",
    input: "#DFC8E3",
    ring: "#C026D3",
  },

  SAND_DUNE: {
    background: "#FBF8F3",
    foreground: "#2B2419",

    card: "#FFFFFF",
    cardForeground: "#2B2419",

    popover: "#FFFFFF",
    popoverForeground: "#2B2419",

    primary: "#A16207",
    primaryRgb: "161, 98, 7",
    primaryForeground: "#FFFFFF",

    secondary: "#F5EBDA",
    secondaryForeground: "#713F12",

    muted: "#F4EFE6",
    mutedForeground: "#7D735F",

    accent: "#EADBBE",
    accentForeground: "#5C3A0B",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "#E6DCC8",
    input: "#D9CCB1",
    ring: "#A16207",
  },

  // ---------- DARK THEMES ----------

  MIDNIGHT_INDIGO: {
    background: "#0E1020",
    foreground: "#E6E8FF",

    card: "#151832",
    cardForeground: "#E6E8FF",

    popover: "#151832",
    popoverForeground: "#E6E8FF",

    primary: "#818CF8",
    primaryRgb: "129, 140, 248",
    primaryForeground: "#0E1020",

    secondary: "#1E2250",
    secondaryForeground: "#C7D2FE",

    muted: "#1A1D3A",
    mutedForeground: "#9AA0CC",

    accent: "#2A2F6B",
    accentForeground: "#E0E7FF",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#262A52",
    input: "#2F3465",
    ring: "#818CF8",
  },

  DEEP_OCEAN: {
    background: "#07161C",
    foreground: "#E0F4F8",

    card: "#0D222B",
    cardForeground: "#E0F4F8",

    popover: "#0D222B",
    popoverForeground: "#E0F4F8",

    primary: "#22D3EE",
    primaryRgb: "34, 211, 238",
    primaryForeground: "#04222A",

    secondary: "#12353F",
    secondaryForeground: "#A5F3FC",

    muted: "#0F2B34",
    mutedForeground: "#86AAB4",

    accent: "#164B59",
    accentForeground: "#CFFAFE",

    destructive: "#FB7185",
    destructiveForeground: "#1A0B0B",

    border: "#17353F",
    input: "#1F4551",
    ring: "#22D3EE",
  },

  ORCHID_NIGHT: {
    background: "#120B1E",
    foreground: "#F0E8FF",

    card: "#1B122D",
    cardForeground: "#F0E8FF",

    popover: "#1B122D",
    popoverForeground: "#F0E8FF",

    primary: "#A78BFA",
    primaryRgb: "167, 139, 250",
    primaryForeground: "#150C26",

    secondary: "#2A1B4A",
    secondaryForeground: "#DDD0FF",

    muted: "#231838",
    mutedForeground: "#A596C4",

    accent: "#3A2766",
    accentForeground: "#EDE4FF",

    destructive: "#FB7185",
    destructiveForeground: "#1A0B0B",

    border: "#2E2048",
    input: "#3A2A5C",
    ring: "#A78BFA",
  },

  EMBER_GLOW: {
    background: "#1A0F0A",
    foreground: "#FFEDE3",

    card: "#261710",
    cardForeground: "#FFEDE3",

    popover: "#261710",
    popoverForeground: "#FFEDE3",

    primary: "#FB923C",
    primaryRgb: "251, 146, 60",
    primaryForeground: "#200F05",

    secondary: "#3A2216",
    secondaryForeground: "#FFD2B0",

    muted: "#2F1D14",
    mutedForeground: "#C09A84",

    accent: "#4E2D1B",
    accentForeground: "#FFE1CC",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#3D261A",
    input: "#4C3122",
    ring: "#FB923C",
  },

  FOREST_NIGHT: {
    background: "#0A1510",
    foreground: "#E3F5EA",

    card: "#112119",
    cardForeground: "#E3F5EA",

    popover: "#112119",
    popoverForeground: "#E3F5EA",

    primary: "#34D399",
    primaryRgb: "52, 211, 153",
    primaryForeground: "#052016",

    secondary: "#17332A",
    secondaryForeground: "#A7F3D0",

    muted: "#132A21",
    mutedForeground: "#86AE9C",

    accent: "#1E4A3A",
    accentForeground: "#D1FAE5",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#1B3A2D",
    input: "#244A3A",
    ring: "#34D399",
  },

  ROSE_NOIR: {
    background: "#190C13",
    foreground: "#FFE8F1",

    card: "#25121C",
    cardForeground: "#FFE8F1",

    popover: "#25121C",
    popoverForeground: "#FFE8F1",

    primary: "#F472B6",
    primaryRgb: "244, 114, 182",
    primaryForeground: "#24091A",

    secondary: "#3B1B2D",
    secondaryForeground: "#FBCFE8",

    muted: "#301726",
    mutedForeground: "#C291A9",

    accent: "#522138",
    accentForeground: "#FCE7F3",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#3F1E30",
    input: "#502A3E",
    ring: "#F472B6",
  },

  GOLDEN_DUSK: {
    background: "#17130A",
    foreground: "#FDF3D7",

    card: "#231D0F",
    cardForeground: "#FDF3D7",

    popover: "#231D0F",
    popoverForeground: "#FDF3D7",

    primary: "#FBBF24",
    primaryRgb: "251, 191, 36",
    primaryForeground: "#231A03",

    secondary: "#3A2F14",
    secondaryForeground: "#FDE68A",

    muted: "#2E2511",
    mutedForeground: "#BFAE80",

    accent: "#4F3F17",
    accentForeground: "#FEF3C7",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#3D3216",
    input: "#4D401E",
    ring: "#FBBF24",
  },

  GRAPHITE_NIGHT: {
    background: "#0B0D12",
    foreground: "#E8EAF0",

    card: "#12151C",
    cardForeground: "#E8EAF0",

    popover: "#12151C",
    popoverForeground: "#E8EAF0",

    primary: "#CBD5E1",
    primaryRgb: "203, 213, 225",
    primaryForeground: "#0B0D12",

    secondary: "#1C212B",
    secondaryForeground: "#CBD5E1",

    muted: "#161A22",
    mutedForeground: "#8B93A5",

    accent: "#252B38",
    accentForeground: "#F1F5F9",

    destructive: "#F87171",
    destructiveForeground: "#1A0B0B",

    border: "#232834",
    input: "#2E3442",
    ring: "#CBD5E1",
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



export const htmlWrapper = ({
  theme,
  screen,
}: {
  theme: string;
  screen: any | undefined;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                  ],
                },

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

          html,
          body {
            margin: 0;
            padding: 0;
            font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
            scrollbar-width: none;
          }

          body {
            background-color: var(--background);
            color: var(--foreground);
            scrollbar-width: none;
          }

          img {
            max-width: 100%;
          }

          .bg-\\[var\\(--background\\)\\] {
            background-color: var(--background) !important;
          }

          .text-\\[var\\(--foreground\\)\\] {
            color: var(--foreground) !important;
          }

          .bg-\\[var\\(--card\\)\\] {
            background-color: var(--card) !important;
          }

          .text-\\[var\\(--card-foreground\\)\\] {
            color: var(--card-foreground) !important;
          }

          .bg-\\[var\\(--primary\\)\\] {
            background-color: var(--primary) !important;
          }

          .text-\\[var\\(--primary-foreground\\)\\] {
            color: var(--primary-foreground) !important;
          }

          .bg-\\[var\\(--secondary\\)\\] {
            background-color: var(--secondary) !important;
          }

          .text-\\[var\\(--secondary-foreground\\)\\] {
            color: var(--secondary-foreground) !important;
          }

          .bg-\\[var\\(--muted\\)\\] {
            background-color: var(--muted) !important;
          }

          .text-\\[var\\(--muted-foreground\\)\\] {
            color: var(--muted-foreground) !important;
          }

          .bg-\\[var\\(--accent\\)\\] {
            background-color: var(--accent) !important;
          }

          .text-\\[var\\(--accent-foreground\\)\\] {
            color: var(--accent-foreground) !important;
          }

          .border-\\[var\\(--border\\)\\] {
            border-color: var(--border) !important;
          }
        </style>
      </head>

      <body>
        ${screen ?? ""}
      </body>
    </html>
  `;
};