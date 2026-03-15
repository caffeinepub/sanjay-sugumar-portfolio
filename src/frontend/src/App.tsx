import { useCallback, useEffect, useRef, useState } from "react";

// ─── GitHub Repos Hook ────────────────────────────────────────────────────────
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
}

function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.github.com/users/sanjaysugumar2005/repos?sort=updated&per_page=12",
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GitHubRepo[] = await res.json();
      setRepos(data.filter((r) => !r.fork));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load repos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, retry: fetchRepos };
}

// ─── Resume Exists Hook ───────────────────────────────────────────────────────
function useResumeExists() {
  const [resumeExists, setResumeExists] = useState(false);
  useEffect(() => {
    fetch("/resume/sanjayresume.pdf", { method: "HEAD" })
      .then((r) => setResumeExists(r.ok))
      .catch(() => setResumeExists(false));
  }, []);
  return { resumeExists };
}

// ─── Boat + Neon + Sky Styles ─────────────────────────────────────────────────
const boatStyles = `
  @keyframes boatDrift {
    0%   { left: -12%; }
    100% { left: 112%; }
  }
  @keyframes boatBob {
    0%   { transform: translateY(0px) rotate(-0.8deg); }
    25%  { transform: translateY(-6px) rotate(0deg); }
    50%  { transform: translateY(-8px) rotate(0.8deg); }
    75%  { transform: translateY(-5px) rotate(0deg); }
    100% { transform: translateY(0px) rotate(-0.8deg); }
  }
  .boat-animate {
    animation:
      boatDrift 70s linear infinite,
      boatBob 6s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg,rgba(139,92,246,0.07) 25%,rgba(139,92,246,0.18) 50%,rgba(139,92,246,0.07) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  @keyframes neonCycle {
    0%, 16%  { color: #a855f7; text-shadow: 0 0 8px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #a855f7; }
    20%, 36% { color: #3b82f6; text-shadow: 0 0 8px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 80px #3b82f6; }
    40%, 56% { color: #06b6d4; text-shadow: 0 0 8px #06b6d4, 0 0 20px #06b6d4, 0 0 40px #06b6d4, 0 0 80px #06b6d4; }
    60%, 76% { color: #ec4899; text-shadow: 0 0 8px #ec4899, 0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 80px #ec4899; }
    80%, 96% { color: #facc15; text-shadow: 0 0 8px #facc15, 0 0 20px #facc15, 0 0 40px #facc15, 0 0 80px #facc15; }
    100%     { color: #a855f7; text-shadow: 0 0 8px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #a855f7; }
  }
  .neon-name {
    animation: neonCycle 25s linear infinite;
    font-weight: 800;
  }
  .subtitle-fade {
    transition: opacity 1.5s ease-in-out;
  }

  @keyframes skyDay {
    0%    { background: linear-gradient(to bottom, #0a0a1a 0%, #1a1a3a 100%); }
    8%    { background: linear-gradient(to bottom, #ff6b35 0%, #ff9a3c 40%, #1a3a6b 100%); }
    20%   { background: linear-gradient(to bottom, #1a6bb5 0%, #4a9fd4 40%, #87ceeb 100%); }
    40%   { background: linear-gradient(to bottom, #0d4b8c 0%, #1a7fc4 40%, #87ceeb 100%); }
    60%   { background: linear-gradient(to bottom, #1a6bb5 0%, #4a9fd4 40%, #87ceeb 100%); }
    72%   { background: linear-gradient(to bottom, #c0392b 0%, #e67e22 40%, #2c3e6b 100%); }
    80%   { background: linear-gradient(to bottom, #0a0a2a 0%, #1a1a4a 100%); }
    100%  { background: linear-gradient(to bottom, #0a0a1a 0%, #1a1a3a 100%); }
  }

  @keyframes sunMove {
    0%    { left: -8%; bottom: -10%; opacity: 0; }
    5%    { opacity: 1; }
    8%    { left: 10%; bottom: 20%; }
    40%   { left: 50%; bottom: 65%; }
    72%   { left: 90%; bottom: 20%; opacity: 1; }
    76%   { left: 95%; bottom: 5%; opacity: 0; }
    100%  { left: 95%; bottom: -10%; opacity: 0; }
  }

  @keyframes moonMove {
    0%    { left: -8%; bottom: -10%; opacity: 0; }
    82%   { left: -8%; bottom: -10%; opacity: 0; }
    86%   { left: 10%; bottom: 20%; opacity: 1; }
    93%   { left: 50%; bottom: 58%; opacity: 1; }
    98%   { left: 90%; bottom: 25%; opacity: 1; }
    100%  { left: 95%; bottom: 15%; opacity: 0.3; }
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.2; }
  }

  @keyframes starsAppear {
    0%, 75%  { opacity: 0; }
    82%      { opacity: 1; }
    100%     { opacity: 1; }
  }

  .sky-animate {
    animation: skyDay 36s linear infinite;
  }

  .sun-animate {
    animation: sunMove 36s linear infinite;
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff7c0 0%, #ffe033 40%, #ffb300 70%, rgba(255,150,0,0) 100%);
    box-shadow: 0 0 20px 10px rgba(255,200,0,0.5), 0 0 60px 20px rgba(255,150,0,0.3);
    transform: translate(-50%, 50%);
    pointer-events: none;
  }

  .moon-animate {
    animation: moonMove 36s linear infinite;
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: radial-gradient(circle, #fffff0 0%, #d4d4c0 60%, rgba(200,200,160,0) 100%);
    box-shadow: 0 0 15px 8px rgba(220,220,180,0.4), 0 0 40px 15px rgba(180,180,140,0.2);
    transform: translate(-50%, 50%);
    pointer-events: none;
  }

  .stars-animate {
    animation: starsAppear 36s linear infinite;
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  @keyframes telegramPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,136,204,0.5), 0 8px 32px rgba(0,136,204,0.35); }
    50%      { box-shadow: 0 0 0 12px rgba(0,136,204,0), 0 8px 32px rgba(0,136,204,0.55); }
  }
  .telegram-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 36px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #0088cc 0%, #229ed9 100%);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s ease, background 0.25s ease;
    animation: telegramPulse 2.4s ease-in-out infinite;
  }
  .telegram-btn:hover {
    transform: translateY(-4px) scale(1.05);
    background: linear-gradient(135deg, #0099dd 0%, #33aaee 100%);
  }
  .telegram-btn:active {
    transform: translateY(-1px) scale(1.01);
  }

  @keyframes resumeGlow {
    0%, 100% { box-shadow: 0 4px 20px rgba(168,85,247,0.4); }
    50%       { box-shadow: 0 4px 32px rgba(168,85,247,0.8), 0 0 20px rgba(59,130,246,0.5); }
  }
  .resume-btn-view {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(90deg, #a855f7, #3b82f6);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 20px rgba(168,85,247,0.4);
  }
  .resume-btn-view:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 4px 32px rgba(168,85,247,0.8), 0 0 20px rgba(59,130,246,0.5);
  }
  .resume-btn-download {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 700;
    color: #facc15;
    background: transparent;
    border: 2px solid #facc15;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
    box-shadow: 0 4px 20px rgba(250,204,21,0.2);
  }
  .resume-btn-download:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 4px 32px rgba(250,204,21,0.6), 0 0 20px rgba(250,204,21,0.4);
    background: rgba(250,204,21,0.1);
  }
`;

// ─── GitHub Icon ──────────────────────────────────────────────────────────────
function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Telegram Icon ────────────────────────────────────────────────────────────
function TelegramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

// ─── Sky Background ───────────────────────────────────────────────────────────
function SkyBackground() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: ((i * 137.5) % 100).toFixed(1),
    top: ((i * 73.1) % 55).toFixed(1),
    size: 1 + (i % 3),
    delay: ((i * 0.4) % 3).toFixed(1),
    duration: (2 + (i % 3)).toFixed(1),
  }));

  return (
    <div className="sky-animate fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      <div className="stars-animate">
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "#fff",
              animation: `starTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite, starsAppear 36s linear infinite`,
            }}
          />
        ))}
      </div>
      {/* Sun */}
      <div className="sun-animate" />
      {/* Moon */}
      <div className="moon-animate" />
    </div>
  );
}

// ─── Wave Background ──────────────────────────────────────────────────────────
function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      {
        color: "rgba(14,40,90,0.55)",
        amp: 55,
        freq: 0.005,
        speed: 0.00025,
        yOffset: 0.6,
      },
      {
        color: "rgba(30,80,160,0.40)",
        amp: 40,
        freq: 0.008,
        speed: 0.0003,
        yOffset: 0.68,
      },
      {
        color: "rgba(59,130,246,0.28)",
        amp: 30,
        freq: 0.011,
        speed: 0.00035,
        yOffset: 0.74,
      },
      {
        color: "rgba(147,197,253,0.18)",
        amp: 18,
        freq: 0.016,
        speed: 0.0004,
        yOffset: 0.8,
      },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const wave of waves) {
        const baseY = canvas.height * wave.yOffset;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            baseY + Math.sin(x * wave.freq + time * wave.speed * 60) * wave.amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(
          0,
          baseY - wave.amp,
          0,
          canvas.height,
        );
        grad.addColorStop(0, wave.color);
        grad.addColorStop(1, "rgba(5,5,15,0.6)");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}

// ─── Boat ─────────────────────────────────────────────────────────────────────
function Boat() {
  return (
    <>
      <style>{boatStyles}</style>
      <div
        className="boat-animate"
        style={{
          position: "fixed",
          top: "62%",
          zIndex: 2,
          pointerEvents: "none",
          width: "90px",
        }}
      >
        <svg
          role="img"
          aria-label="Decorative sailing boat"
          viewBox="0 0 90 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="60"
        >
          <path
            d="M44 8 L44 38 L62 38 Z"
            fill="rgba(255,255,255,0.7)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.8"
          />
          <path
            d="M44 18 L44 38 L28 38 Z"
            fill="rgba(167,139,250,0.55)"
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="0.8"
          />
          <line
            x1="44"
            y1="6"
            x2="44"
            y2="40"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
          />
          <path
            d="M14 40 Q45 52 76 40 L70 48 Q45 58 20 48 Z"
            fill="rgba(30,30,70,0.92)"
            stroke="rgba(139,92,246,0.6)"
            strokeWidth="1"
          />
          <path
            d="M22 42 Q45 50 68 42"
            stroke="rgba(139,92,246,0.4)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="50" cy="41" r="2.5" fill="rgba(250,204,21,0.6)" />
        </svg>
      </div>
    </>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [active, setActive] = useState("home");
  const links = ["home", "resume", "education", "projects", "contact"];

  const scroll = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(5,5,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(139,92,246,0.2)",
      }}
    >
      <span
        className="font-bold text-xl"
        style={{
          background: "linear-gradient(90deg,#a855f7,#3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SS
      </span>
      <ul className="flex gap-6">
        {links.map((l) => (
          <li key={l}>
            <button
              type="button"
              data-ocid={`nav.${l}.link`}
              onClick={() => scroll(l)}
              className="capitalize text-sm transition-colors"
              style={{ color: active === l ? "#facc15" : "#94a3b8" }}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const HERO_SUBTITLES = [
  "Python Full Stack Developer",
  "Web Application Builder",
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [subIdx, setSubIdx] = useState(0);
  const [subVisible, setSubVisible] = useState(true);
  const { resumeExists } = useResumeExists();

  useEffect(() => {
    const interval = setInterval(() => {
      setSubVisible(false);
      setTimeout(() => {
        setSubIdx((i) => (i + 1) % HERO_SUBTITLES.length);
        setSubVisible(true);
      }, 1500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
    >
      <div className="mb-6">
        <div
          className="w-36 h-36 rounded-full mx-auto mb-4 overflow-hidden"
          style={{
            boxShadow: "0 0 40px rgba(139,92,246,0.5)",
            border: "3px solid rgba(139,92,246,0.6)",
          }}
        >
          <img
            src="/assets/uploads/WhatsApp-Image-2026-03-03-at-12.15.22-PM-1.jpeg"
            alt="Sanjay Sugumar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Neon cycling name */}
      <h1
        className="neon-name text-5xl md:text-7xl mb-3"
        style={{ minHeight: "1.2em", textAlign: "center" }}
      >
        Sanjay Sugumar
      </h1>

      {/* Fade-cycling subtitle */}
      <p
        className="subtitle-fade text-xl md:text-2xl mb-2 font-medium"
        style={{
          color: "#22d3ee",
          opacity: subVisible ? 1 : 0,
          minHeight: "2rem",
          textAlign: "center",
          textShadow: "0 0 10px rgba(34,211,238,0.5)",
        }}
      >
        {HERO_SUBTITLES[subIdx]}
      </p>

      <p
        className="text-sm md:text-base max-w-xl mx-auto mb-8"
        style={{ color: "#94a3b8" }}
      >
        Building elegant, scalable web applications with passion and precision.
      </p>

      {/* Primary action buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          data-ocid="hero.contact.primary_button"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 rounded-full font-semibold text-black transition-transform hover:scale-105"
          style={{
            background: "linear-gradient(90deg,#facc15,#f97316)",
            boxShadow: "0 4px 20px rgba(250,204,21,0.4)",
          }}
        >
          Get in Touch
        </button>
        <a
          href="https://github.com/sanjaysugumar2005"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="hero.github.link"
          className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
          style={{
            border: "2px solid rgba(139,92,246,0.6)",
            color: "#a78bfa",
            background: "rgba(139,92,246,0.1)",
          }}
        >
          <GitHubIcon size={18} />
          GitHub
        </a>
      </div>

      {/* Resume buttons — only shown when file exists */}
      {resumeExists && (
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <a
            href="/resume/sanjayresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.resume_view.button"
            className="resume-btn-view"
          >
            📄 View Resume
          </a>
          <a
            href="/resume/sanjayresume.pdf"
            download="sanjayresume.pdf"
            data-ocid="hero.resume_download.button"
            className="resume-btn-download"
          >
            ⬇ Download Resume
          </a>
        </div>
      )}
    </section>
  );
}

// ─── Resume Section ───────────────────────────────────────────────────────────
function ResumeSection() {
  const { resumeExists } = useResumeExists();

  return (
    <section
      id="resume"
      className="relative z-10 py-24 px-4 max-w-3xl mx-auto text-center"
    >
      <h2 className="text-4xl font-bold mb-4" style={{ color: "#60a5fa" }}>
        Resume
      </h2>
      <p className="mb-10" style={{ color: "#94a3b8" }}>
        A summary of my skills, experience, and qualifications.
      </p>
      {resumeExists ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resume/sanjayresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="resume.view.primary_button"
            className="resume-btn-view"
          >
            📄 View Resume
          </a>
          <a
            href="/resume/sanjayresume.pdf"
            download="sanjayresume.pdf"
            data-ocid="resume.download.secondary_button"
            className="resume-btn-download"
          >
            ⬇ Download Resume (PDF)
          </a>
        </div>
      ) : (
        <p style={{ color: "#64748b" }}>Resume coming soon.</p>
      )}
    </section>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 py-24 px-4 max-w-4xl mx-auto"
    >
      <h2
        className="text-4xl font-bold text-center mb-3"
        style={{ color: "#60a5fa" }}
      >
        Education
      </h2>
      <p className="text-center mb-12 text-sm" style={{ color: "#64748b" }}>
        My academic journey
      </p>
      <div className="grid sm:grid-cols-2 gap-8">
        <div
          data-ocid="education.item.1"
          className="rounded-2xl p-7 transition-transform hover:-translate-y-2 cursor-default"
          style={{
            background: "rgba(10,10,30,0.75)",
            border: "1px solid rgba(139,92,246,0.35)",
            boxShadow:
              "0 4px 32px rgba(139,92,246,0.15), 0 1px 0 rgba(139,92,246,0.2) inset",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: "rgba(250,204,21,0.15)",
                color: "#facc15",
                border: "1px solid rgba(250,204,21,0.3)",
              }}
            >
              School
            </span>
            <span className="text-3xl">🏫</span>
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ color: "#e2e8f0" }}>
            Krishnaswamy Higher Secondary School
          </h3>
          <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
            📍 Cuddalore, Tamil Nadu
          </p>
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(250,204,21,0.1)",
              color: "#fde047",
              border: "1px solid rgba(250,204,21,0.25)",
            }}
          >
            <span>✓</span> Completed 2023
          </div>
        </div>
        <div
          data-ocid="education.item.2"
          className="rounded-2xl p-7 transition-transform hover:-translate-y-2 cursor-default"
          style={{
            background: "rgba(10,10,30,0.75)",
            border: "1px solid rgba(59,130,246,0.35)",
            boxShadow:
              "0 4px 32px rgba(59,130,246,0.15), 0 1px 0 rgba(59,130,246,0.2) inset",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: "rgba(250,204,21,0.15)",
                color: "#facc15",
                border: "1px solid rgba(250,204,21,0.3)",
              }}
            >
              College
            </span>
            <span className="text-3xl">🎓</span>
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ color: "#e2e8f0" }}>
            A.M. Jain College
          </h3>
          <p className="text-sm mb-1 font-medium" style={{ color: "#a78bfa" }}>
            BCA – Bachelor of Computer Applications
          </p>
          <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
            📍 Meenambakkam, Chennai
          </p>
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(59,130,246,0.12)",
              color: "#93c5fd",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            <span>●</span> Currently Pursuing
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Language Color Map ───────────────────────────────────────────────────────
const langColor: Record<string, string> = {
  Python: "#3b82f6",
  TypeScript: "#60a5fa",
  JavaScript: "#facc15",
  HTML: "#f97316",
  CSS: "#a855f7",
  Java: "#ef4444",
  "C++": "#06b6d4",
  Go: "#34d399",
  Rust: "#fb923c",
  Ruby: "#f43f5e",
  PHP: "#818cf8",
  Shell: "#4ade80",
};

// ─── Projects Section ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col"
      style={{
        background: "rgba(10,10,30,0.75)",
        border: "1px solid rgba(59,130,246,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="shimmer rounded-lg h-5 w-3/5 mb-4" />
      <div className="shimmer rounded-lg h-3 w-full mb-2" />
      <div className="shimmer rounded-lg h-3 w-4/5 mb-6" />
      <div className="shimmer rounded-lg h-3 w-1/3 mb-6" />
      <div className="shimmer rounded-full h-10 w-full mt-auto" />
    </div>
  );
}

function ProjectsSection() {
  const { repos, loading, error, retry } = useGitHubRepos();

  return (
    <section
      id="projects"
      className="relative z-10 py-24 px-4 max-w-5xl mx-auto"
    >
      <h2
        className="text-4xl font-bold text-center mb-3"
        style={{ color: "#60a5fa" }}
      >
        Projects
      </h2>
      <p className="text-center mb-12 text-sm" style={{ color: "#64748b" }}>
        My public GitHub repositories
      </p>

      {loading && (
        <div
          data-ocid="projects.loading_state"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && error && (
        <div
          data-ocid="projects.error_state"
          className="text-center py-16 flex flex-col items-center gap-4"
        >
          <p className="text-lg" style={{ color: "#f87171" }}>
            ⚠️ {error}
          </p>
          <button
            type="button"
            data-ocid="projects.retry.button"
            onClick={retry}
            className="px-6 py-2.5 rounded-full font-semibold text-black transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(90deg,#facc15,#f97316)",
              boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div
          data-ocid="projects.empty_state"
          className="text-center py-16"
          style={{ color: "#64748b" }}
        >
          <p className="text-lg">No public repositories found.</p>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <div
              key={repo.id}
              data-ocid={`projects.item.${i + 1}`}
              className="rounded-2xl p-6 flex flex-col group transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "rgba(10,10,30,0.75)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 4px 24px rgba(59,130,246,0.08)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(139,92,246,0.5)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 40px rgba(139,92,246,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  "1px solid rgba(59,130,246,0.2)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px rgba(59,130,246,0.08)";
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-base font-bold group-hover:text-yellow-400 transition-colors leading-tight pr-2"
                  style={{ color: "#e2e8f0" }}
                >
                  {repo.name}
                </h3>
                <span style={{ color: "#6b7280", flexShrink: 0 }}>
                  <GitHubIcon size={17} />
                </span>
              </div>

              <p className="text-sm mb-4 flex-1" style={{ color: "#94a3b8" }}>
                {repo.description ?? "No description provided."}
              </p>

              <div className="flex items-center gap-3 mb-5 flex-wrap">
                {repo.language && (
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "#94a3b8" }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: langColor[repo.language] ?? "#6b7280",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "#fde047" }}
                  >
                    ★ {repo.stargazers_count}
                  </span>
                )}
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid={`projects.github.link.${i + 1}`}
                className="flex items-center justify-center gap-2 rounded-full py-2.5 px-5 font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(90deg,#facc15,#f97316)",
                  color: "#000",
                  boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
                }}
              >
                <GitHubIcon size={15} />
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 px-4">
      <h2
        className="text-4xl font-bold text-center mb-4"
        style={{ color: "#60a5fa" }}
      >
        Contact
      </h2>
      <p className="text-center mb-12" style={{ color: "#94a3b8" }}>
        Have a project in mind? Let's talk.
      </p>

      <div className="flex flex-col items-center justify-center gap-8">
        <a
          href="https://t.me/+T-DXigqqceI1ODBl"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="contact.telegram.button"
          className="telegram-btn"
        >
          <TelegramIcon size={26} />
          Message Me on Telegram
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative z-10 py-8 px-4"
      style={{ borderTop: "1px solid rgba(139,92,246,0.15)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} Sanjay Sugumar. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#60a5fa" }}
          >
            caffeine.ai
          </a>
        </p>
        <a
          href="https://github.com/sanjaysugumar2005"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="footer.github.link"
          className="flex items-center gap-2 text-sm transition-colors hover:text-purple-400"
          style={{ color: "#64748b" }}
        >
          <GitHubIcon size={16} />
          github.com/sanjaysugumar2005
        </a>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{ background: "#05050f", minHeight: "100vh", color: "#e2e8f0" }}
    >
      <SkyBackground />
      <WaveBackground />
      <Boat />
      <NavBar />
      <HeroSection />
      <ResumeSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
