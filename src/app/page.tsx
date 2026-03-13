import { PROJECTS, CATEGORIES } from "@/data/projects";
import Hub from "@/components/Hub";

export default function Home() {
  return <Hub projects={PROJECTS} categories={CATEGORIES} />;
}
