export type ProjectStatus = "live" | "beta" | "wip";

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  status: ProjectStatus;
  builtBy: string;
  emoji: string;
  featured?: boolean;
}

export const CATEGORIES = [
  "All",
  "Sales",
  "Campaigns",
  "Creators",
  "Operations",
  "Analytics",
  "Internal",
];

export const PROJECTS: Project[] = [
  {
    id: "sales-dash",
    name: "Sales Dashboard",
    description: "Real-time view of deals, pipeline, and revenue. The nerve center for tracking what's closing.",
    url: "https://your-sales-dash-url.vercel.app",
    category: "Sales",
    status: "live",
    builtBy: "Nick",
    emoji: "📊",
    featured: true,
  },
  {
    id: "campaign-tracker",
    name: "Campaign Tracker",
    description: "Track active campaigns, creator deliverables, and client status all in one place.",
    url: "https://your-campaign-tracker-url.vercel.app",
    category: "Campaigns",
    status: "live",
    builtBy: "Canyon",
    emoji: "🎯",
    featured: true,
  },
];
