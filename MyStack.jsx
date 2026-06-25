import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared MY_STACK object with frontend, backend, database, and tools categories
export const MY_STACK = {
  frontend: [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
  ],
  database: [
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
  ],
  tools: [
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub Actions",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
  ],
};

export default function MyStack() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Reveal .slide-up items from opacity: 0, y: 40 with a staggered entrance
      gsap.fromTo(
        gsap.utils.toArray(".slide-up", containerRef.current),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Animates when top of section enters 80% of viewport
            toggleActions: "play none none none",
          },
        },
      );

      // 2. Fade and lift the whole section upward as it scrolls away (exit animation)
      gsap.fromTo(
        containerRef.current,
        { y: 0, opacity: 1 },
        {
          y: -80,
          opacity: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 80%", // Starts fading and moving up when section bottom reaches 80%
            end: "bottom 20%", // Fully fades and reaches max lift by 20%
            scrub: true, // Tied directly to scrollbar position
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="my-stack"
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-24 w-full bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Title */}
        <h2 className="text-5xl font-anton uppercase text-white tracking-wider border-b border-neutral-800 pb-8 slide-up">
          My Stack
        </h2>

        {/* Categories Grid (Mobile Responsive Layout) */}
        <div className="grid grid-cols-1 gap-16">
          {Object.entries(MY_STACK).map(([category, items]) => (
            <div
              key={category}
              className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 pb-12 border-b border-neutral-900 last:border-b-0 last:pb-0"
            >
              {/* Left Column: Category Label */}
              <div className="slide-up">
                <h3 className="text-5xl font-anton uppercase text-muted-foreground">
                  {category}
                </h3>
              </div>

              {/* Right Column: Technology Chips */}
              <div className="list-wrapper flex gap-x-11 gap-y-9 flex-wrap">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="item-container flex gap-3.5 items-center leading-none slide-up"
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span className="item-text text-2xl capitalize text-neutral-200">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
