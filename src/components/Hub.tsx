"use client";

import { useState, useMemo } from "react";
import { Project, ProjectStatus } from "@/data/projects";
import styles from "./Hub.module.css";

interface HubProps {
  projects: Project[];
  categories: string[];
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  wip: "Building",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardIcon}>{project.emoji}</div>
        <span className={`${styles.status} ${styles[project.status]}`}>
          <span className={styles.sDot} />
          {STATUS_LABELS[project.status]}
        </span>
      </div>
      <div className={styles.cardArrow}>↗</div>
      <div className={styles.cardName}>{project.name}</div>
      <div className={styles.cardDesc}>{project.description}</div>
      <div className={styles.cardFooter}>
        <span className={styles.cardCat}>{project.category}</span>
        <span className={styles.cardBy}>{project.builtBy}</span>
      </div>
    </a>
  );
}

export default function Hub({ projects, categories }: HubProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.builtBy.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, search]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>Sh</div>
          <span className={styles.logoName}>Shifted</span>
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.livePill}>
            <div className={styles.liveDot} />
            {liveCount} tools live
          </div>
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            SideShift<br />
            <em>Internal Tools</em>
          </h1>
          <p className={styles.heroSub}>
            Every tool, dashboard, and internal project the SideShift team has shipped. All in one place.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>{projects.length}</div>
            <div className={styles.statLabel}>Total tools</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>{liveCount}</div>
            <div className={styles.statLabel}>Live</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>
              {[...new Set(projects.map((p) => p.builtBy))].length}
            </div>
            <div className={styles.statLabel}>Builders</div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.fBtn} ${activeCategory === cat ? styles.fBtnActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.main}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>Nothing found.</div>
        ) : (
          <>
            {featured.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionRow}>
                  <span className={styles.secLabel}>Featured</span>
                  <span className={styles.secCount}>{featured.length}</span>
                </div>
                <div className={styles.grid}>
                  {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </section>
            )}
            {rest.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionRow}>
                  <span className={styles.secLabel}>All Tools</span>
                  <span className={styles.secCount}>{rest.length}</span>
                </div>
                <div className={styles.grid}>
                  {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <span>SideShift &copy; {new Date().getFullYear()}</span>
        <span>Built by the team, for the team.</span>
      </footer>
    </div>
  );
}
