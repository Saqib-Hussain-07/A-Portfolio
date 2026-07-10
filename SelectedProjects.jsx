import React from "react";

export default function SelectedProjects({ projectsRef, PROJECTS }) {
  return (
    <section id="Projects" className="projects-section">
      <div ref={projectsRef} className="skills-content">
        <div className="section-tag gsap-proj">SELECTED PROJECTS</div>
        <div style={{ borderTop: "1px solid #242424" }}>
          {PROJECTS.map((p) => (
            <div key={p.id} className="proj-row gsap-proj" data-cursor="hover">
              <div className="proj-num">_{p.id}.</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-tags">
                {p.tags.map((t, j) => (
                  <span
                    key={t}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {j > 0 && (
                      <span
                        className="proj-tag-dot"
                        style={{
                          background: [
                            "#f59e0b",
                            "#3b82f6",
                            "#06b6d4",
                            "#8b5cf6",
                            "#ec4899",
                          ][j % 5],
                        }}
                      />
                    )}
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
