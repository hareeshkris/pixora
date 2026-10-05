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

export const DeviceTypes = ["website", "mobile"] as const;