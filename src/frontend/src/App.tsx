import { Badge } from "@/components/ui/badge";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  ChevronUp,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiGithub, SiLinkedin, SiTelegram } from "react-icons/si";
import ResumePage from "./pages/ResumePage";

// ── Dark Mode ────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, toggle };
}

// ── Typing Animation ─────────────────────────────────────────────────
const TYPING_TEXT = "Hi and hello! I'm Sanjay Sugumar — glad you're here.";

function useTypingLoop(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const indexRef = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (indexRef.current < text.length) {
        const jitter = Math.random() * 40;
        timer = setTimeout(() => {
          indexRef.current += 1;
          setDisplayed(text.slice(0, indexRef.current));
        }, 70 + jitter);
      } else {
        timer = setTimeout(() => setPhase("pause"), 2500);
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 100);
    } else {
      if (indexRef.current > 0) {
        timer = setTimeout(() => {
          indexRef.current -= 1;
          setDisplayed(text.slice(0, indexRef.current));
        }, 38);
      } else {
        timer = setTimeout(() => setPhase("typing"), 600);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, text]); // eslint-disable-line

  return displayed;
}

// ── Scroll Reveal Hook ───────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const el of els) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ── 3D Tilt Card ─────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -7;
    const tiltY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
    card.style.boxShadow = `0 20px 60px rgba(100, 80, 180, 0.22), ${tiltY * -2}px ${tiltX * -2}px 30px rgba(100, 80, 180, 0.1)`;
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.boxShadow = "";
    card.style.transition =
      "transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease";
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 500);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// ── 3D Desk Scene ────────────────────────────────────────────────────
function DeskScene() {
  const typed = useTypingLoop(TYPING_TEXT);

  return (
    <div
      className="desk-scene-container relative select-none"
      style={{ width: 640, height: 420, margin: "0 auto" }}
    >
      {/* Desk surface */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 620,
          height: 160,
          background:
            "linear-gradient(175deg, #f8f7ff 0%, #eeeaf8 60%, #d8d0f0 100%)",
          borderRadius: "20px 20px 8px 8px",
          boxShadow:
            "0 20px 60px rgba(80,60,160,0.15), 0 8px 20px rgba(80,60,160,0.08)",
          border: "1px solid rgba(200,190,240,0.6)",
        }}
      />

      {/* Monitor stand base */}
      <div
        style={{
          position: "absolute",
          bottom: 148,
          left: "50%",
          transform: "translateX(-50%)",
          width: 90,
          height: 14,
          background: "linear-gradient(180deg, #c8c0e0 0%, #b0a8d0 100%)",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(100,80,160,0.2)",
        }}
      />

      {/* Monitor stand neck */}
      <div
        style={{
          position: "absolute",
          bottom: 157,
          left: "50%",
          transform: "translateX(-50%)",
          width: 18,
          height: 28,
          background: "linear-gradient(180deg, #bab0d8 0%, #a8a0cc 100%)",
          borderRadius: "4px 4px 0 0",
        }}
      />

      {/* Monitor bezel (floating) */}
      <div
        className="monitor-float"
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 380,
          height: 240,
          background: "linear-gradient(145deg, #2a2540 0%, #1a1530 100%)",
          borderRadius: 16,
          padding: 10,
          boxShadow:
            "0 30px 80px rgba(20,10,50,0.45), 0 8px 20px rgba(20,10,50,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Screen glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(120,100,220,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Monitor screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(160deg, #12102a 0%, #1a1535 50%, #0f0d20 100%)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "18px 22px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Screen scanline effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
              borderRadius: 8,
              pointerEvents: "none",
            }}
          />

          {/* Profile image */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "3px solid rgba(150, 120, 255, 0.8)",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow:
                "0 0 20px rgba(120,100,220,0.5), 0 0 40px rgba(120,100,220,0.2)",
            }}
          >
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-03-at-12.15.22-PM-1.jpeg"
              alt="Sanjay Sugumar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>

          {/* Typing text */}
          <div
            style={{
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: 11,
              color: "rgba(200, 190, 255, 0.95)",
              textAlign: "center",
              lineHeight: 1.6,
              minHeight: 56,
              maxWidth: 300,
              position: "relative",
              zIndex: 1,
            }}
          >
            <span>{typed}</span>
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "1em",
                background: "rgba(180,160,255,0.9)",
                marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>

          {/* Screen corner glows */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 80,
              height: 80,
              background:
                "radial-gradient(circle at 0% 0%, rgba(100,80,200,0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 80,
              height: 80,
              background:
                "radial-gradient(circle at 100% 100%, rgba(100,80,200,0.25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Keyboard */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          width: 260,
          height: 44,
          background: "linear-gradient(180deg, #2e2a42 0%, #242038 100%)",
          borderRadius: 8,
          boxShadow:
            "0 8px 24px rgba(20,10,50,0.35), 0 2px 6px rgba(20,10,50,0.2)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: "7px 12px",
        }}
      >
        {/* Keyboard rows */}
        {[13, 12, 10].map((count) => (
          <div
            key={count}
            style={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: count }, (_, ki) => String(ki)).map((k) => (
              <div
                key={k}
                style={{
                  flex: "1",
                  height: 7,
                  background:
                    "linear-gradient(180deg, #3a3558 0%, #2a2545 100%)",
                  borderRadius: 2,
                  boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mouse */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          right: 108,
          width: 38,
          height: 54,
          background: "linear-gradient(160deg, #2e2a42 0%, #201c34 100%)",
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          boxShadow:
            "0 6px 20px rgba(20,10,50,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
          gap: 2,
        }}
      >
        {/* Mouse buttons divider */}
        <div
          style={{
            width: 1,
            height: 16,
            background: "rgba(255,255,255,0.08)",
          }}
        />
        {/* Scroll wheel */}
        <div
          style={{
            width: 5,
            height: 8,
            background: "rgba(150,130,200,0.5)",
            borderRadius: 3,
            marginTop: 2,
          }}
        />
      </div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────
function Navbar({
  dark,
  onToggleDark,
}: { dark: boolean; onToggleDark: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Summary", href: "#summary" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(14, 12, 28, 0.92)"
          : "rgba(14, 12, 28, 0.78)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
          data-ocid="nav.link"
        >
          Sanjay Sugumar
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a href="/resume" className="nav-link" data-ocid="nav.resume.link">
            Resume
          </a>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
            }}
            aria-label="Toggle dark mode"
            data-ocid="nav.toggle"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={onToggleDark}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.9)",
            }}
            aria-label="Toggle dark mode"
            data-ocid="nav.toggle"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="text-white"
            aria-label="Toggle menu"
            data-ocid="nav.open_modal_button"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: "rgba(14,12,28,0.96)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
            data-ocid="nav.modal"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume"
              className="block px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.resume.link"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────
function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = parallaxRef.current;
    const scene = sceneRef.current;
    if (!container || !scene) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = Math.max(-15, Math.min(15, x * 0.025));
      const moveY = Math.max(-10, Math.min(10, y * 0.02));
      scene.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleLeave = () => {
      scene.style.transform = "translate(0px, 0px)";
      scene.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
      setTimeout(() => {
        if (scene) scene.style.transition = "transform 0.1s linear";
      }, 600);
    };

    scene.style.transition = "transform 0.1s linear";
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={parallaxRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden"
    >
      {/* Depth blur blobs */}
      <div
        className="depth-blob"
        style={{
          width: 480,
          height: 480,
          top: "-10%",
          left: "-5%",
          background: "oklch(0.7 0.12 291 / 0.18)",
        }}
      />
      <div
        className="depth-blob"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          right: "-8%",
          background: "oklch(0.6 0.14 310 / 0.14)",
        }}
      />

      {/* Desk scene with parallax */}
      <div ref={sceneRef} className="relative z-10 w-full mb-4">
        <DeskScene />
      </div>

      {/* Hero text */}
      <motion.div
        className="relative z-10 text-center px-4 mt-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 gradient-text"
          style={{
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            lineHeight: 1.1,
          }}
        >
          Sanjay Sugumar
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium mb-8 max-w-xl mx-auto">
          Python Full Stack Developer &amp; Web Application Builder
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="btn-primary"
            data-ocid="hero.primary_button"
          >
            <ExternalLink className="w-4 h-4" />
            View My Work
          </a>
          <a
            href="/assets/uploads/sanjayresume-1--1.pdf"
            download
            className="btn-secondary"
            data-ocid="hero.secondary_button"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-muted-foreground/50"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────
function SectionCard({
  id,
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="section-card" data-ocid={`${id}.card`}>
        <h2 className="section-heading">
          <Icon
            className="w-5 h-5 flex-shrink-0"
            style={{ color: "oklch(var(--primary))" }}
          />
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// ── Data ─────────────────────────────────────────────────────────────
const SKILLS = [
  "Python",
  "HTML / CSS",
  "JavaScript (Basics)",
  "Data Types & Operators",
  "Loops & Functions",
  "Data Science (Learning)",
  "Git (Basics)",
  "Problem Solving",
];

const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description:
      "Built a responsive personal portfolio showcasing projects and skills with modern design using HTML and CSS.",
    tags: ["HTML", "CSS"],
    link: "https://github.com/sanjaysugumar2005",
  },
  {
    title: "Basic Python Programs",
    description:
      "Developed arithmetic, loop, and function programs to strengthen core Python concepts and problem-solving skills.",
    tags: ["Python"],
    link: "https://github.com/sanjaysugumar2005",
  },
];

const EDUCATION = [
  {
    degree: "BCA – Bachelor of Computer Applications",
    institution: "A.M. Jain College",
    location: "Meenambakkam, Chennai",
    year: "Pursuing · Expected 2026",
    status: "current",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Krishnaswamy Higher Secondary School",
    location: "Cuddalore, Tamil Nadu",
    year: "Completed 2023",
    status: "done",
  },
];

// ── Portfolio Page ───────────────────────────────────────────────────
function PortfolioPage() {
  const { dark, toggle } = useDarkMode();
  const [showTop, setShowTop] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar dark={dark} onToggleDark={toggle} />

      <main>
        <HeroSection />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-8 pb-24">
          {/* Professional Summary */}
          <SectionCard
            id="summary"
            title="Professional Summary"
            icon={() => <span style={{ fontSize: 18 }}>👤</span>}
          >
            <p className="text-foreground/80 leading-relaxed text-base">
              Aspiring Python Developer with foundational knowledge of
              variables, data types, loops, and functions. Built a personal
              website using HTML and CSS. Currently learning Data Science
              fundamentals and sharpening problem-solving skills — eager to grow
              within a collaborative engineering team.
            </p>
          </SectionCard>

          {/* Skills */}
          <SectionCard
            id="skills"
            title="Skills"
            icon={() => <span style={{ fontSize: 18 }}>⚡</span>}
            delay={60}
          >
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.map((skill, i) => (
                <span
                  key={skill}
                  className="skill-badge"
                  data-ocid={`skills.item.${i + 1}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Projects */}
          <SectionCard
            id="projects"
            title="Projects"
            icon={() => <span style={{ fontSize: 18 }}>🚀</span>}
            delay={100}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PROJECTS.map((project, i) => (
                <TiltCard key={project.title}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl h-full"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      textDecoration: "none",
                    }}
                    data-ocid={`projects.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="font-bold text-foreground text-base leading-tight"
                        style={{
                          fontFamily:
                            "'Bricolage Grotesque', system-ui, sans-serif",
                        }}
                      >
                        {project.title}
                      </h3>
                      <SiGithub
                        className="w-5 h-5 flex-shrink-0 ml-3 mt-0.5"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://github.com/sanjaysugumar2005"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
                data-ocid="projects.primary_button"
              >
                <Github className="w-4 h-4" />
                View all on GitHub
              </a>
            </div>
          </SectionCard>

          {/* Education */}
          <SectionCard
            id="education"
            title="Education"
            icon={() => <span style={{ fontSize: 18 }}>🎓</span>}
            delay={120}
          >
            <div className="relative flex flex-col gap-0">
              {/* Timeline line */}
              <div
                className="absolute left-[19px] top-5 bottom-5 w-px"
                style={{ background: "oklch(var(--primary) / 0.25)" }}
              />

              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.degree}
                  className="flex gap-5 pb-8 last:pb-0"
                  data-ocid={`education.item.${i + 1}`}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          edu.status === "current"
                            ? "oklch(var(--primary) / 0.2)"
                            : "oklch(var(--secondary))",
                        border: `2px solid oklch(var(--primary) / ${edu.status === "current" ? "0.6" : "0.3"})`,
                        boxShadow:
                          edu.status === "current"
                            ? "0 0 16px oklch(var(--primary) / 0.3)"
                            : "none",
                      }}
                    >
                      <GraduationCap
                        className="w-4 h-4"
                        style={{ color: "oklch(var(--primary))" }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3
                        className="font-bold text-foreground text-sm leading-tight"
                        style={{
                          fontFamily:
                            "'Bricolage Grotesque', system-ui, sans-serif",
                        }}
                      >
                        {edu.degree}
                      </h3>
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full flex-shrink-0"
                        style={{
                          background:
                            edu.status === "current"
                              ? "oklch(var(--primary) / 0.15)"
                              : "oklch(var(--muted))",
                          color:
                            edu.status === "current"
                              ? "oklch(var(--primary))"
                              : "oklch(var(--muted-foreground))",
                        }}
                      >
                        {edu.year}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(var(--foreground) / 0.8)" }}
                    >
                      {edu.institution}
                    </p>
                    <p
                      className="text-xs flex items-center gap-1 mt-0.5"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Contact */}
          <SectionCard
            id="contact"
            title="Contact"
            icon={() => <span style={{ fontSize: 18 }}>✉️</span>}
            delay={140}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 7339476299",
                  href: "tel:+917339476299",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "sanjaysugumar2005@gmail.com",
                  href: "mailto:sanjaysugumar2005@gmail.com",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-4 rounded-2xl transition-all group"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    textDecoration: "none",
                  }}
                  data-ocid="contact.link"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ background: "oklch(var(--primary) / 0.12)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "oklch(var(--primary))" }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              <a
                href="https://github.com/sanjaysugumar2005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl transition-all group"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  textDecoration: "none",
                }}
                data-ocid="contact.link"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: "oklch(var(--primary) / 0.12)" }}
                >
                  <SiGithub
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--primary))" }}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GitHub</p>
                  <p className="text-sm font-semibold text-foreground">
                    github.com/sanjaysugumar2005
                  </p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/sanjay-sugumar-9209933b8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl transition-all group"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  textDecoration: "none",
                }}
                data-ocid="contact.link"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: "oklch(var(--primary) / 0.12)" }}
                >
                  <SiLinkedin
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--primary))" }}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                  <p className="text-sm font-semibold text-foreground">
                    sanjay-sugumar-9209933b8
                  </p>
                </div>
              </a>
            </div>

            {/* Telegram CTA */}
            <div className="text-center">
              <a
                href="https://t.me/+T-DXigqqceI1ODBl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-white transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #0088cc 0%, #006699 100%)",
                  boxShadow: "0 4px 20px rgba(0,136,204,0.4)",
                  animation: "telegram-pulse 3s ease-in-out infinite",
                  textDecoration: "none",
                  fontSize: 15,
                }}
                data-ocid="contact.primary_button"
              >
                <SiTelegram className="w-5 h-5" />
                Message Me on Telegram
                <Send className="w-4 h-4" />
              </a>
            </div>
          </SectionCard>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-10 px-4"
        style={{
          background: "rgba(14, 12, 28, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="font-bold text-base mb-2"
          style={{
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Sanjay Sugumar
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          &copy; {new Date().getFullYear()} &middot; Built with{" "}
          <span style={{ color: "#f87171" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.55)",
              textDecoration: "underline",
            }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--primary)), oklch(0.38 0.22 300))",
              boxShadow: "0 4px 20px oklch(var(--primary) / 0.5)",
            }}
            aria-label="Back to top"
            data-ocid="page.button"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Router ───────────────────────────────────────────────────────────
const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PortfolioPage,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: ResumePage,
});

const routeTree = rootRoute.addChildren([indexRoute, resumeRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
