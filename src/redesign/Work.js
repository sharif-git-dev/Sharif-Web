import React, { useState } from "react";
import { motion } from "framer-motion";
import { EASE, PageIntro, ProjectCard } from "./ui";
import { projectCategories, projects } from "./data";

export default function Work() {
  const [category, setCategory] = useState("All");
  const visible = projects.filter(
    (project) => category === "All" || project.category === category,
  );
  const count = (name) =>
    name === "All"
      ? projects.length
      : projects.filter((project) => project.category === name).length;

  return (
    <>
      <PageIntro
        eyebrow={`Work — ${projects.length} case studies`}
        lines={["Selected", <em>work.</em>]}
        description="Product design for SaaS and life-sciences platforms, mobile apps, and web applications built end to end."
      />

      <section className="wrap work-index">
        <div className="filter-bar">
          <div className="filters" role="group" aria-label="Filter projects by type">
            {projectCategories.map((name) => (
              <button
                key={name}
                type="button"
                className="filter"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {category === name && (
                  <motion.span
                    className="filter-pill"
                    layoutId="filter-pill"
                    transition={{ duration: 0.4, ease: EASE }}
                    aria-hidden="true"
                  />
                )}
                <span className="filter-label">
                  {name}
                  <sup>{count(name)}</sup>
                </span>
              </button>
            ))}
          </div>
          <span className="eyebrow" role="status">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* Re-keyed per filter so the visible cards animate in together. */}
        <div className="project-grid" key={category}>
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              heading="h2"
              onMount
              delay={Math.min(i, 5) * 0.06}
            />
          ))}
        </div>
      </section>
    </>
  );
}
