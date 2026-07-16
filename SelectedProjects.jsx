import React, { useState } from "react";

export default function SelectedProjects({ projectsRef, PROJECTS }) {
  // Only used as a fallback for touch devices, where :hover never fires.
  // Desktop hover is handled entirely by CSS below, for native,
  // zero-re-render smoothness matching the reference file.
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="Projects" className="projects-section">
      <style>{`
        .proj-row {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid #242424;
        }

        .proj-image-wrap {
          max-height: 0px;
          opacity: 0;
          overflow: hidden;
          margin-bottom: 0px;
          transition:
            max-height 0.6s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s ease 0.05s,
            margin-bottom 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .proj-image-wrap img {
          width: 100%;
          height: 480px;
          display: block;
          margin: 20px 0 0;
          border-radius: 12px;
          object-fit: cover;
          object-position: top;
          transform: scale(1.06);
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .proj-row:hover + .proj-image-wrap {
            max-height: 550px;
            opacity: 1;
            margin-bottom: 24px;
          }

          .proj-row:hover + .proj-image-wrap img {
            transform: scale(1);
          }
        }

        .proj-image-wrap.is-open {
          max-height: 550px;
          opacity: 1;
          margin-bottom: 24px;
        }

        .proj-image-wrap.is-open img {
          transform: scale(1);
        }

        .proj-link-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #39FF14;
          font-size: 18px;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          margin-left: 16px;
          text-decoration: none;
        }

        .proj-link-arrow:hover {
          transform: translateX(4px);
        }
      `}</style>

      <div ref={projectsRef} className="skills-content">
        <div className="section-tag gsap-proj">SELECTED PROJECTS</div>

        <div style={{ borderTop: "1px solid #242424" }}>
          {PROJECTS.map((p) => {
            const isOpen = activeProject === p.id;

            return (
              <React.Fragment key={p.id}>
                <div
                  className="proj-row gsap-proj"
                  data-cursor="hover"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setActiveProject(isOpen ? null : p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProject(isOpen ? null : p.id);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
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

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="proj-link-arrow"
                    >
                      →
                    </a>
                  )}
                </div>

                {/* Hover (desktop, pure CSS) / Tap (mobile, is-open class) image reveal */}
                <div className={`proj-image-wrap${isOpen ? " is-open" : ""}`}>
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
