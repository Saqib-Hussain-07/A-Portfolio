import { useState, useEffect, useRef, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import SelectedProjects from "./SelectedProjects";
import TechSphere from "./TechSphere";

/* ─────────────────────────── DATA ─────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    name: "HireSense",
    tags: ["React", "Node.js", "Express", "MongoDB", "Jwt Auth"],
    image: "/ProjectImage/HireSense.png",
    link: "",
  },
  {
    id: "02",
    name: "CampusConnect",
    tags: ["React", "Node.js", "Express", "MongoDB", "Jwt Auth"],
    image: "/ProjectImage/CampusConnect.png",
    link: "https://campus-connect-sigma-six.vercel.app/",
  },
  {
    id: "03",
    name: "Type Sprint",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Chart.js",
      "Web Audio API",
      "Local Storage",
    ],
    image: "/ProjectImage/TypeSprint.png",
    link: "https://saqib-hussain-07.github.io/Type-Sprint/",
  },
];

const SKILLS = [
  {
    cat: "Languages",
    items: [
      {
        name: "Java",
        icon: "/logo/Java.png",
      },
      {
        name: "Javascript",
        icon: "/logo/js.png",
      },
      {
        name: "SQL",
        icon: "/logo/Sql.png",
      },
    ],
  },

  {
    cat: "FRONTEND",
    items: [
      {
        name: "HTML5",
        icon: "/logo/Html5.png",
      },
      {
        name: "CSS3",
        icon: "/logo/Css.png",
      },
      {
        name: "Tailwind CSS",
        icon: "/logo/tailwind.png",
      },

      {
        name: "Next.js",
        icon: "/logo/next.png",
        breakBefore: true,
      },
      // {
      //   name: "Bootstrap 5",
      //   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      // },
      {
        name: "React",
        icon: "/logo/react.png",
      },
    ],
  },
  {
    cat: "BACKEND",
    items: [
      {
        name: "Node.js",
        icon: "/logo/node.png",
      },
      {
        name: "Express",
        icon: "/logo/express.png",
      },
      {
        name: "RestAPI",
        icon: "/logo/RestAPI.png",
      },
    ],
  },
  {
    cat: "DATABASE",
    items: [
      {
        name: "MongoDB",
        icon: "/logo/mongodb.svg",
      },
      {
        name: "PostgreSQL",
        icon: "/logo/postgreSQL.png",
      },
      {
        name: "MySQL",
        icon: "/logo/mysql.svg",
      },
    ],
  },
  {
    cat: "TOOLS",
    items: [
      {
        name: "Docker",
        icon: "/logo/docker.svg",
      },
      {
        name: "Git",
        icon: "/logo/git.png",
      },
      {
        name: "GitHub Actions",
        icon: "/logo/github.png",
      },
    ],
  },
];

const EDUCATION = [
  {
    org: "Lovely Professional University",
    role: "Master of Computer Applications",
    period: "2025 – Present",
    detail: "Phagwara, Punjab",
  },
  {
    org: "Tilka Manjhi Bhagalpur University",
    role: "Bachelor of Computer Applications",
    period: "2020 – 2024",
    detail: "Bhagalpur, Bihar",
  },
];

const G = "#39FF14";

/* ─────────────────────── PARTICLES ─────────────────────── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current,
      ctx = c.getContext("2d");
    let id;
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 90 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > c.width) d.vx *= -1;
        if (d.y < 0 || d.y > c.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ──────────────────── SCROLL PROGRESS ──────────────────── */
function ScrollProgress() {
  const barRef = useRef(null);

  useLenis(({ scroll, limit }) => {
    if (!barRef.current) return;
    const progress = limit > 0 ? (scroll / limit) * 100 : 0;
    barRef.current.style.transform = `translateY(-${100 - progress}%)`;
  });

  return (
    <div
      style={{
        position: "fixed",
        right: "2%",
        top: "50svh",
        width: 2,
        height: 100,
        background: "#1a1a1a",
        zIndex: 200,
        overflow: "hidden",
        borderRadius: 2,
        transform: "translateY(-50%)",
      }}
    >
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(to bottom, ${G}, #00ffcc)`,
          transform: "translateY(-100%)",
          willChange: "transform",
          boxShadow: `0 0 8px ${G}88`,
        }}
      />
    </div>
  );
}

/* ──────────────────── COUNTER ──────────────────── */
function Counter({ n, s = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let x = 0;
          const step = Math.ceil(n / 40);
          const t = setInterval(() => {
            x += step;
            if (x >= n) {
              setVal(n);
              clearInterval(t);
            } else setVal(x);
          }, 35);
          o.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [n]);
  return (
    <span ref={ref}>
      {val}
      {s}
    </span>
  );
}

/* ──────────────────── GSAP REVEAL HOOK ──────────────────── */
function useScrollReveal(selector, options = {}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector, containerRef.current);
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 50, ...options.from },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          ease: options.ease ?? "power3.out",
          stagger: options.stagger ?? 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? "top 82%",
            end: options.end ?? "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
          ...options.to,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return containerRef;
}

/* ──────────────────── APP ──────────────────── */
export default function App() {
  const [open, setOpen] = useState(false);
  const lenis = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Use lenis scroll if available, fall back to native
    if (lenis.current?.lenis) {
      lenis.current.lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  }, []);

  const LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

  /* ── Per-section scroll reveal refs ── */
  const heroRef = useScrollReveal(".gsap-hero", { stagger: 0.1, y: 60 });
  const aboutRef = useScrollReveal(".gsap-about", { stagger: 0.12, y: 45 });
  const skillsRef = useRef(null);

  /* Skills scroll animations */
  useEffect(() => {
    if (!skillsRef.current) return;

    const ctx = gsap.context(() => {
      /* Entrance: Slide up items */
      gsap.fromTo(
        gsap.utils.toArray(".gsap-skill", skillsRef.current),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      /* Exit: Move up and fade out */
      gsap.to(skillsRef.current, {
        y: -100,
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: 1,
        },
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);
  const projectsRef = useScrollReveal(".gsap-proj", {
    stagger: 0.1,
    y: 0,
    from: { x: -30 },
    to: { x: 0 },
    ease: "power2.out",
  });
  const eduRef = useScrollReveal(".gsap-edu", { stagger: 0.12, y: 40 });
  const contactRef = useScrollReveal(".gsap-contact", { stagger: 0.1, y: 35 });

  return (
    <ReactLenis
      ref={lenis}
      root
      options={{ lerp: 0.1, duration: 1.4, smoothWheel: true }}
    >
      <div
        style={{
          fontFamily: "'Inter',sans-serif",
          background: "#141414",
          color: "#d4d4d4",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          ::selection{background:#39FF1422}
          ::-webkit-scrollbar{width:0}
          a{color:inherit;text-decoration:none}
          html{zoom:0.9;}
          body{
            background:#141414;
            -webkit-font-smoothing:antialiased;
          }

          /* ── NAV HAMBURGER ── */
          .hbg{background:none;border:none;padding:6px;position:relative;z-index:300;display:flex;flex-direction:column;justify-content:center;align-items:flex-end;gap:5px}
          .hbg span{display:block;height:2px;background:#ccc;transition:all .35s cubic-bezier(.77,0,.18,1);transform-origin:right center}
          .hbg span:nth-child(1){width:26px}
          .hbg span:nth-child(2){width:18px}
          .hbg span:nth-child(3){width:26px}
          .hbg:hover span{background:#fff}
          .hbg.open span:nth-child(1){transform:translateY(3.5px) rotate(-45deg);width:26px}
          .hbg.open span:nth-child(2){opacity:0;transform:scaleX(0)}
          .hbg.open span:nth-child(3){transform:translateY(-3.5px) rotate(45deg);width:26px}

          /* ── FULLSCREEN MENU ── */
          .fs-overlay{position:fixed;inset:0;background:#111;z-index:250;display:flex;flex-direction:column;justify-content:center;align-items:center;transition:opacity .5s cubic-bezier(.77,0,.18,1),transform .5s cubic-bezier(.77,0,.18,1)}
          .fs-overlay.closed{opacity:0;pointer-events:none;transform:scale(1.04)}
          .fs-overlay.open{opacity:1;transform:scale(1)}
          .fs-close{position:absolute;top:28px;right:48px;background:none;border:none;color:#555;font-size:2rem;transition:color .2s;line-height:1;font-family:'Inter',sans-serif}
          .fs-close:hover{color:#eee}
          .fs-nav-item{font-family:'Anton',sans-serif;font-size:clamp(3rem,8vw,5.5rem);color:#2a2a2a;transition:color .25s,letter-spacing .25s;letter-spacing:.02em;line-height:1.05;display:flex;align-items:center;gap:24px}
          .fs-nav-item:hover{color:#d8d8d8;letter-spacing:.06em}
          .fs-nav-num{font-family:'Inter',sans-serif;font-size:.60rem;color:#333;letter-spacing:.12em;transition:color .25s;align-self:flex-start;margin-top:12px}
          .fs-nav-item:hover .fs-nav-num{color:${G}}
          .fs-socials{position:absolute;bottom:40px;left:0;right:0;display:flex;justify-content:center;gap:40px}
          .fs-social-link{font-size:1.2rem;color:#383838;letter-spacing:.14em;text-transform:uppercase;transition:color .2s}
          .fs-social-link:hover{color:#aaa}
          .top-nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:22px 48px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(to bottom,rgba(20,20,20,.95),transparent)}
          .hero-section{min-height:100vh;display:flex;align-items:center;padding:0 80px;position:relative}
          .hero-grid{max-width:1280px;width:100%;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:center}
          .hero-stats{display:flex;flex-direction:column;gap:44px;text-align:right;padding-right:16px}
          .about-section{padding:140px 80px;position:relative}
          .about-grid{border-top:1px solid #1e1e1e;padding-top:60px;display:grid;grid-template-columns:1fr 1fr;gap:80px}
          .skills-section{padding:100px 60px}
          .skills-content {max-width:1500px;margin:0 auto;}
          .projects-section{padding:100px 60px}
          .experience-section{padding:100px 60px}
          .contact-section{padding:160px 60px;text-align:center}
          .footer-bar{border-top:1px solid #1a1a1a;padding:20px 60px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}

          /* ── PROJECT ROWS ───────────────────────────────────────────────── */
          .proj-row{
            padding:28px 0;
            border-bottom:1px solid #1e1e1e;
            position:relative;
            transition:padding-left .45s cubic-bezier(.22,1,.36,1),background .45s ease,box-shadow .45s ease;
          }
          .proj-row:hover{padding-left:18px;background:linear-gradient(to right,#39FF1410,transparent 60%);box-shadow:inset 3px 0 0 ${G}}
          .proj-num{font-size:.72rem;color:#333;letter-spacing:.05em;margin-bottom:8px;transition:color .35s ease}
          .proj-row:hover .proj-num{color:${G}}
          .proj-name{
            font-family:'Anton',sans-serif;
            font-size:clamp(2rem,4.5vw,3.2rem);
            color:#c8c8c8;letter-spacing:.01em;line-height:1;
            transition:color .35s ease,letter-spacing .35s ease;
          }
          .proj-row:hover .proj-name{color:${G};letter-spacing:.04em}
          .proj-tags{margin-top:12px;font-size:.75rem;color:#888;display:flex;align-items:center;gap:8px;flex-wrap:wrap;transition:color .3s}
          .proj-row:hover .proj-tags{color:#aaa}
          .proj-tag-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
          .proj-arrow{
            position:absolute;right:16px;top:50%;
            transform:translateY(-50%) translateX(14px);
            font-size:1.5rem;color:${G};opacity:0;
            transition:opacity .4s cubic-bezier(.22,1,.36,1),transform .4s cubic-bezier(.22,1,.36,1);
          }
          .proj-row:hover .proj-arrow{opacity:1;transform:translateY(-50%) translateX(0)}

          /* ── SKILL ITEMS ── */
          .skill-section{display:grid;gap:100px}
          .skill-row {display: grid;grid-template-columns: 5fr 7fr;gap: 0;align-items: start;}
          .skill-cat {font-family: 'Anton', sans-serif;font-size: clamp(3rem, 7vw, 5rem);color: #c8c8c8;letter-spacing: .04em;line-height: 0.95;padding-top: 2px;transition: color .4s ease;text-transform: uppercase;white-space: nowrap;}
          .skill-row:hover .skill-cat{color:#fff}
          .skill-grid{display:grid;grid-template-columns:repeat(3, max-content);gap:36px 44px;}
          .skill-item {display: flex;align-items: center;gap: 14px;line-height: 1;cursor: default;transition: all .35s cubic-bezier(.22,1,.36,1);}
          .skill-item:hover{transform:translateY(-2px)}
          .skill-icon {width: 40px;height: 40px;object-fit: contain;flex-shrink: 0;}
          .skill-item:hover .skill-icon{filter:drop-shadow(0 0 16px ${G}dd);transform:scale(1.15) rotate(-5deg)}
          .skill-name {font-size: 1.5rem;text-transform: capitalize;color: #e0e0e0;font-weight: 400;transition: color .35s cubic-bezier(.22,1,.36,1);}
          .skill-item:hover .skill-name{color:${G}}
          @media (max-width: 920px) {
            .skill-row{grid-template-columns:1fr;gap:20px}
            .skill-cat{font-size:clamp(2.4rem,8vw,3.6rem)}
            .skill-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 24px}
          }

          /* ── EDUCATION ROWS ── */
          .edu-timeline{margin-left:12px;border-left:2px solid #1e1e1e}
          .edu-row{
            padding:32px 0 32px 28px;border-bottom:1px solid #1a1a1a;position:relative;
            transition:background .4s ease,padding-left .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease;
          }
          .edu-row:last-child{border-bottom:none}
          .edu-row:hover{background:linear-gradient(to right,#39FF140a,transparent 55%);padding-left:36px;box-shadow:inset 2px 0 0 ${G}44}
          .edu-row::before{content:'';position:absolute;left:-7px;top:38px;width:12px;height:12px;border-radius:50%;background:#141414;border:2px solid #333;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s cubic-bezier(.22,1,.36,1)}
          .edu-row:hover::before{background:${G};border-color:${G};box-shadow:0 0 20px ${G}88;transform:scale(1.35)}
          .edu-org{font-size:.75rem;color:#686868;letter-spacing:.1em;margin-bottom:8px;text-transform:uppercase;transition:color .3s ease}
          .edu-row:hover .edu-org{color:#999}
          .edu-role{font-family:'Anton',sans-serif;font-size:clamp(1.4rem,2.5vw,2rem);color:#c0c0c0;letter-spacing:.01em;margin-bottom:8px;transition:color .35s ease,letter-spacing .35s ease}
          .edu-row:hover .edu-role{color:#e8e8e8;letter-spacing:.025em}
          .edu-period{font-size:.78rem;color:#666;letter-spacing:.04em;transition:color .3s ease}
          .edu-row:hover .edu-period{color:#999}

          /* ── CONTACT ── */
          .contact-email{font-family:'Anton',sans-serif;font-size:clamp(2rem,5vw,4.2rem);color:#d0d0d0;letter-spacing:.02em;transition:color .3s;display:inline-block;position:relative;padding-bottom:4px}
          .contact-email::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(to right,${G},#00ffcc);transition:width .45s cubic-bezier(.77,0,.18,1)}
          .contact-email:hover{color:${G}}
          .contact-email:hover::after{width:100%}

          /* ── SECTION TAG ── */
          .section-tag{display:flex;align-items:center;gap:10px;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#666;margin-bottom:52px}
          .section-tag::before{content:'✳';color:${G};font-size:.85rem;display:inline-block;animation:spin 8s linear infinite}
          @keyframes spin{to{transform:rotate(360deg)}}

          /* ── HERO ── */
          .hero-cursor{display:inline-block;width:3px;height:.82em;background:${G};margin-left:6px;vertical-align:middle;animation:blink .9s step-end infinite;border-radius:1px}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

          .quote-mark{font-family:'Anton',sans-serif;font-size:clamp(6rem,14vw,11rem);color:${G};opacity:.1;line-height:.6;display:block;margin-bottom:-.15em;user-select:none;pointer-events:none;letter-spacing:-.05em}

          .side-email{position:fixed;left:-72px;top:50%;transform:translateY(-50%) rotate(-90deg);font-size:.72rem;letter-spacing:.16em;color:#bfbfbf;z-index:50;white-space:nowrap;pointer-events:none;text-shadow:0 0 5px rgba(255,255,255,0.08)}

          @media(max-width:1024px){
            .hero-grid{grid-template-columns:1fr;gap:32px}
            .hero-stats{text-align:left;padding-right:0;flex-direction:row;flex-wrap:wrap;gap:24px}
            .about-grid{grid-template-columns:1fr;gap:36px}
          }

          @media(max-width:768px){
            .top-nav{padding:18px 24px}
            .hero-section{padding:0 24px 72px}
            .about-section{padding:100px 24px}
            .skills-section,.projects-section,.experience-section,.contact-section{padding:90px 24px}
            .footer-bar{padding:20px 24px}
            .fs-close{top:20px;right:24px}
            .fs-nav-item{font-size:clamp(2.1rem,8vw,3rem);gap:14px}
            .fs-socials{flex-wrap:wrap;gap:20px;padding:0 24px}
            .skill-row{grid-template-columns:1fr;gap:16px;padding:0 0 6px}
            .skill-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 16px}
            .skill-name{white-space:normal;line-height:1.3}
            .side-email{display:none}
            .edu-timeline{margin-left:0;border-left:none}
            .edu-row{padding-left:0}
            .edu-row::before{display:none}
          }

          @media(max-width:560px){
            .hero-section{padding:0 20px 72px}
            .about-section{padding:92px 20px}
            .skills-section,.projects-section,.experience-section,.contact-section{padding:80px 20px}
            .footer-bar{padding:20px 20px}
            .section-tag{margin-bottom:28px;font-size:.65rem;gap:8px}
            .skill-grid{grid-template-columns:1fr;gap:12px 0}
            .skill-item{min-height:40px}
            .skill-name{font-size:.95rem}
            .skill-cat{font-size:clamp(1.8rem,7vw,2.5rem)}
            .contact-email{font-size:clamp(1.2rem,4.5vw,1.9rem)}
          }
        `}</style>

        <Particles />
        <ScrollProgress />
        <div className="side-email">saqibhussain2212002@gmail.com</div>

        {/* ── FULLSCREEN OVERLAY MENU ── */}
        <div className={`fs-overlay ${open ? "open" : "closed"}`}>
          <button
            className="fs-close"
            onClick={() => setOpen(false)}
            data-cursor="hover"
          >
            ✕
          </button>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            {LINKS.map((l, i) => (
              <div
                key={l}
                className="fs-nav-item"
                data-cursor="hover"
                onClick={() => go(l === "Home" ? "Hero" : l)}
              >
                <span className="fs-nav-num">0{i + 1}</span>
                {l.toUpperCase()}
              </div>
            ))}
          </nav>
          <div className="fs-socials">
            {[
              [
                "LinkedIn ↗",
                "https://www.linkedin.com/in/saqib-hussain-bb8870380/",
              ],
              ["Email ↗", "mailto:saqibhussain2212002@gmail.com"],
              ["GitHub ↗", "https://github.com/Saqib-Hussain-07"],
            ].map(([t, h]) => (
              <a
                key={t}
                href={h}
                target="_blank"
                rel="noreferrer"
                className="fs-social-link"
                data-cursor="hover"
              >
                {t}
              </a>
            ))}
          </div>
        </div>

        {/* ── NAV ── */}
        <nav className="top-nav">
          <span
            onClick={() => go("Hero")}
            data-cursor="hover"
            style={{
              fontFamily: "'Anton',sans-serif",
              fontSize: "1.3rem",
              letterSpacing: ".06em",
              color: "#ddd",
            }}
          >
            SH<span style={{ color: G }}>.</span>
          </span>
          <button
            id="menu-toggle"
            className={`hbg ${open ? "open" : ""}`}
            data-cursor="hover"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* ── HERO ── */}
        <section id="Hero" className="hero-section">
          <div ref={heroRef} className="hero-grid">
            <div>
              <h1
                className="gsap-hero"
                style={{
                  fontFamily: "'Anton',sans-serif",
                  fontSize: "clamp(4.5rem,13vw,10rem)",
                  lineHeight: 0.92,
                  letterSpacing: ".01em",
                  userSelect: "none",
                }}
              >
                <span style={{ color: G }}>FULL-STACK</span>
                <br />
                <span style={{ color: "#d0d0d0" }}>
                  DEVELOPER
                  <span className="hero-cursor" />
                </span>
              </h1>
              <p
                className="gsap-hero"
                style={{
                  marginTop: 28,
                  fontSize: "1.05rem",
                  color: "#888",
                  lineHeight: 1.85,
                  maxWidth: 480,
                  fontWeight: 300,
                }}
              >
                Hi! I'm{" "}
                <strong style={{ color: "#bbb", fontWeight: 500 }}>
                  Saqib
                </strong>
                .  a full-stack developer who's still learning something new with every project. I care about writing clean code, building things that scale, and creating experiences that feel simple to use.
              </p>
              <div
                className="gsap-hero"
                style={{
                  marginTop: 32,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  data-cursor="hover"
                  onClick={() => go("Contact")}
                  style={{
                    background: G,
                    color: "#000",
                    border: "none",
                    padding: "14px 40px",
                    fontFamily: "'Anton',sans-serif",
                    fontSize: ".95rem",
                    letterSpacing: ".1em",
                    transition: "transform .2s,box-shadow .2s",
                    boxShadow: `0 0 0 ${G}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${G}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  LET'S TALK
                </button>
              </div>
              <div
                className="gsap-hero"
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: G,
                    display: "inline-block",
                    boxShadow: `0 0 6px ${G}88`,
                  }}
                />
                <span
                  style={{
                    fontSize: ".8rem",
                    color: "#888",
                    letterSpacing: ".12em",
                  }}
                >
                  Available for full-time opportunities
                </span>
              </div>
            </div>
            <div
              className="gsap-hero"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TechSphere />
            </div>
          </div>
          {/* Scroll indicator */}
          <div
            data-cursor="hover"
            onClick={() => go("About")}
            style={{
              position: "absolute",
              bottom: 36,
              right: 60,
              color: "#333",
              fontSize: "1.1rem",
              letterSpacing: ".06em",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            &gt;
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="About" className="about-section">
          <div ref={aboutRef} style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="gsap-about">
              <span className="quote-mark">&ldquo;</span>
              <blockquote
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem,4.5vw,3.8rem)",
                  color: "#b0b0b0",
                  lineHeight: 1.4,
                  marginBottom: 48,
                }}
              >
                I believe in writing clean, maintainable code — ensuring every
                project is tailored to meet real-world needs and built to scale
                with purpose.
              </blockquote>
              <p
                style={{
                  fontSize: ".72rem",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#777",
                  marginBottom: 52,
                }}
              >
                This is me.
              </p>
            </div>
            <div className="about-grid">
              <div className="gsap-about">
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                    color: "#d8d8d8",
                    letterSpacing: "-.01em",
                  }}
                >
                  Hi, I'm Saqib.
                </h2>
              </div>
              <div className="gsap-about">
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#888",
                    lineHeight: 1.95,
                    marginBottom: 18,
                    fontWeight: 300,
                  }}
                >
                  I'm a motivated MCA student at Lovely Professional University
                  with a strong passion for software development and
                  problem-solving. I specialize in building full-stack projects
                  with modern technologies.
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#888",
                    lineHeight: 1.95,
                    fontWeight: 300,
                  }}
                >
                  My approach focuses on scalable, high-performing solutions.
                  When I'm not coding, I participate in hackathons and work on
                  side projects that push my problem-solving limits.
                </p>
                <div style={{ marginTop: 28, display: "flex", gap: 24 }}>
                  {[
                    [
                      "LinkedIn ↗",
                      "https://www.linkedin.com/in/saqib-hussain-bb8870380/",
                    ],
                    ["Email ↗", "mailto:saqibhussain2212002@gmail.com"],
                  ].map(([t, h]) => (
                    <a
                      key={t}
                      href={h}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      style={{
                        fontSize: ".75rem",
                        letterSpacing: ".15em",
                        color: "#777",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #333",
                        paddingBottom: 2,
                        transition: "color .2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = G)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#777")
                      }
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="Skills" className="skills-section">
          <div ref={skillsRef} className="skills-content">
            <div className="section-tag gsap-skill">MY STACK</div>
            <div className="skill-section">
              {SKILLS.map((s) => (
                <div key={s.cat} className="skill-row gsap-skill">
                  <div className="skill-cat">{s.cat}</div>
                  <div className="skill-grid">
                    {s.items.map((it) => (
                      <div
                        key={it.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                        className="skill-item"
                      >
                        <img
                          src={it.icon}
                          alt={it.name}
                          className="skill-icon"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />
                        <span className="skill-name">{it.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <SelectedProjects projectsRef={projectsRef} PROJECTS={PROJECTS} />

        {/* ── EDUCATION ── */}
        <section id="Experience" className="experience-section">
          <div ref={eduRef} className="skills-content">
            <div className="section-tag gsap-edu">EDUCATION</div>
            <div className="edu-timeline">
              {EDUCATION.map((e, i) => (
                <div key={i} className="edu-row gsap-edu">
                  <div className="edu-org">{e.org}</div>
                  <div className="edu-role">{e.role}</div>
                  <div className="edu-period">
                    {e.period} · {e.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="Contact" className="contact-section">
          <div ref={contactRef} style={{ maxWidth: 900, margin: "0 auto" }}>
            <p
              className="gsap-contact"
              style={{
                fontSize: ".8rem",
                color: "#888",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Have a project in mind?
            </p>
            <a
              href="mailto:saqibhussain2212002@gmail.com"
              className="contact-email gsap-contact"
              data-cursor="hover"
            >
              saqibhussain2212002@gmail.com
            </a>
            <div
              className="gsap-contact"
              style={{
                marginTop: 52,
                display: "flex",
                justifyContent: "center",
                gap: 36,
              }}
            >
              {[
                [
                  "LinkedIn ↗",
                  "https://www.linkedin.com/in/saqib-hussain-bb8870380/",
                ],
                ["GitHub ↗", "https://github.com/Saqib-Hussain-07"],
              ].map(([t, h]) => (
                <a
                  key={t}
                  href={h}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  style={{
                    fontSize: ".75rem",
                    color: "#777",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #333",
                    paddingBottom: 2,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = G)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer-bar">
          <span
            style={{
              fontFamily: "'Anton',sans-serif",
              fontSize: "1rem",
              color: "#555",
              letterSpacing: ".1em",
            }}
          >
            SAQIB HUSSAIN
          </span>
          <p
            style={{
              fontSize: ".72rem",
              color: "#555",
              letterSpacing: ".08em",
            }}
          ></p>
        </footer>
      </div>
    </ReactLenis>
  );
}
