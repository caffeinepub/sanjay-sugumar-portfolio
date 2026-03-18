import {
  BookOpen,
  ChevronDown,
  Download,
  ExternalLink,
  GraduationCap,
  Menu,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiGithub, SiTelegram } from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LAVENDER = "#C9C8E8";
const DARK = "#111111";

// ─── Typing Animation Hook ────────────────────────────────────────────────────
// Text split with \n to control SVG line breaks
const TYPING_FULL = "Hi and hello!\nI'm Sanjay Sugumar,\nglad you're here.";

function useTypingAnimation() {
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (count < TYPING_FULL.length) {
      t = setTimeout(() => setCount((c) => c + 1), 65);
    } else {
      t = setTimeout(() => setCount(0), 5500);
    }
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const displayedText = TYPING_FULL.slice(0, count);
  const lines = displayedText.split("\n");
  const isTyping = count < TYPING_FULL.length;

  return { lines, showCursor: isTyping ? true : showCursor };
}

// ─── Desk SVG Illustration ────────────────────────────────────────────────────
function DeskIllustration() {
  const { lines: typingLines, showCursor } = useTypingAnimation();

  return (
    <div
      className="relative w-full select-none"
      style={{ maxWidth: "1100px", margin: "0 auto" }}
    >
      <svg
        viewBox="0 0 1100 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Desk with large monitor, flower pots, and fish bowl"
        role="img"
      >
        <defs>
          {/* Monitor screen gradient */}
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAFAFA" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </linearGradient>
          {/* Monitor body gradient */}
          <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          {/* Pen gradient */}
          <linearGradient id="penGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D0D0D0" />
            <stop offset="40%" stopColor="#E8E8E8" />
            <stop offset="100%" stopColor="#B8B8B8" />
          </linearGradient>
          {/* Desk gradient */}
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8F8F8" />
            <stop offset="100%" stopColor="#EFEFEF" />
          </linearGradient>
          {/* Pot gradient left */}
          <linearGradient id="potGradL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A6BA8" />
            <stop offset="100%" stopColor="#6A4A88" />
          </linearGradient>
          {/* Pot gradient right */}
          <linearGradient id="potGradR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B7CBB" />
            <stop offset="100%" stopColor="#7A5A9A" />
          </linearGradient>
          {/* Bowl clip */}
          <clipPath id="bowlClip2">
            <ellipse cx="878" cy="288" rx="52" ry="48" />
          </clipPath>
        </defs>

        {/* ── DESK SURFACE ── */}
        <ellipse
          cx="550"
          cy="358"
          rx="490"
          ry="12"
          fill="rgba(80,60,120,0.08)"
        />
        <rect
          x="60"
          y="342"
          width="980"
          height="28"
          rx="6"
          fill="url(#deskGrad)"
        />
        <rect
          x="60"
          y="342"
          width="980"
          height="4"
          rx="2"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <rect x="60" y="366" width="980" height="4" rx="2" fill="#E0E0E0" />
        {/* Desk legs */}
        <rect x="86" y="370" width="22" height="100" rx="6" fill="#E8E8E8" />
        <rect x="992" y="370" width="22" height="100" rx="6" fill="#E8E8E8" />
        <ellipse
          cx="550"
          cy="470"
          rx="460"
          ry="10"
          fill="rgba(80,60,120,0.05)"
        />

        {/* ════════════════════════════════════════
            LEFT FLOWER POT (lavender flowers)
        ════════════════════════════════════════ */}
        {/* Pot shadow */}
        <ellipse cx="148" cy="350" rx="42" ry="6" fill="rgba(0,0,0,0.07)" />
        {/* Pot body */}
        <path
          d="M118 342 Q110 320 112 296 Q114 282 130 278 Q148 275 166 278 Q182 282 184 296 Q186 320 178 342Z"
          fill="url(#potGradL)"
        />
        {/* Pot rim */}
        <ellipse cx="148" cy="278" rx="36" ry="8" fill="#9A7ABB" />
        <ellipse cx="148" cy="275" rx="32" ry="6" fill="#B090D0" />
        {/* Pot base */}
        <ellipse cx="148" cy="342" rx="30" ry="6" fill="#5A3A78" />
        {/* Soil */}
        <ellipse cx="148" cy="275" rx="28" ry="5" fill="#5C3D1E" />
        {/* Stems */}
        <path
          d="M148 275 Q142 252 138 230 Q134 210 136 192"
          stroke="#5A8040"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 275 Q154 248 158 222 Q162 200 160 178"
          stroke="#4A7030"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 275 Q148 255 148 238 Q148 218 150 198"
          stroke="#5A8040"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaves on stems */}
        <path d="M138 230 Q126 222 120 210 Q130 205 140 215Z" fill="#5A8040" />
        <path d="M158 222 Q170 212 176 200 Q165 198 157 208Z" fill="#4A7030" />
        {/* LEFT FLOWER POT - LAVENDER FLOWERS */}
        <g
          className="flower-sway-left"
          style={{ transformOrigin: "148px 275px" }}
        >
          {/* Flower 1 (center) */}
          <circle cx="150" cy="192" r="5" fill="#C084FC" opacity="0.9" />
          <circle cx="150" cy="183" r="4.5" fill="#C084FC" opacity="0.85" />
          <circle cx="143" cy="188" r="4.5" fill="#A855F7" opacity="0.85" />
          <circle cx="157" cy="188" r="4.5" fill="#A855F7" opacity="0.85" />
          <circle cx="143" cy="197" r="4.5" fill="#C084FC" opacity="0.8" />
          <circle cx="157" cy="197" r="4.5" fill="#C084FC" opacity="0.8" />
          <circle cx="150" cy="190" r="3.5" fill="#FDE68A" />
          {/* Flower 2 (left stem) */}
          <circle cx="136" cy="187" r="4" fill="#D8B4FE" opacity="0.9" />
          <circle cx="136" cy="179" r="4" fill="#C084FC" opacity="0.85" />
          <circle cx="130" cy="183" r="4" fill="#A855F7" opacity="0.85" />
          <circle cx="142" cy="183" r="4" fill="#A855F7" opacity="0.85" />
          <circle cx="136" cy="185" r="3" fill="#FDE68A" />
          {/* Flower 3 (right stem) */}
          <circle cx="160" cy="173" r="4.5" fill="#C084FC" opacity="0.9" />
          <circle cx="160" cy="165" r="4" fill="#D8B4FE" opacity="0.85" />
          <circle cx="154" cy="169" r="4" fill="#A855F7" opacity="0.85" />
          <circle cx="166" cy="169" r="4" fill="#B06ED4" opacity="0.85" />
          <circle cx="160" cy="171" r="3" fill="#FDE68A" />
          {/* Small buds */}
          <ellipse
            cx="140"
            cy="208"
            rx="4"
            ry="6"
            fill="#C084FC"
            opacity="0.7"
          />
          <ellipse
            cx="156"
            cy="205"
            rx="3.5"
            ry="5.5"
            fill="#A855F7"
            opacity="0.65"
          />
          {/* Green leaves on flowers */}
          <path
            d="M146 198 Q138 204 134 212"
            stroke="#5A8040"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M152 195 Q160 200 164 208"
            stroke="#4A7030"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* ════════════════════════════════════════
            LARGE DESKTOP MONITOR (center)
        ════════════════════════════════════════ */}
        {/* Monitor shadow */}
        <ellipse cx="548" cy="356" rx="200" ry="10" fill="rgba(0,0,0,0.10)" />
        {/* Monitor stand base */}
        <rect x="490" y="344" width="116" height="10" rx="5" fill="#252525" />
        <rect x="488" y="350" width="120" height="6" rx="3" fill="#1A1A1A" />
        {/* Monitor stand neck */}
        <rect x="532" y="292" width="32" height="56" rx="6" fill="#2A2A2A" />
        {/* Monitor stand neck highlight */}
        <rect
          x="534"
          y="295"
          width="8"
          height="48"
          rx="3"
          fill="#3A3A3A"
          opacity="0.5"
        />
        {/* Monitor body outer */}
        <rect
          x="266"
          y="52"
          width="564"
          height="244"
          rx="14"
          fill="url(#monitorGrad)"
        />
        {/* Monitor bezel inner */}
        <rect x="278" y="64" width="540" height="220" rx="8" fill="#111111" />
        {/* Monitor screen */}
        <rect
          x="286"
          y="70"
          width="524"
          height="210"
          rx="5"
          fill="url(#screenGrad)"
        />
        {/* Camera dot */}
        <circle cx="548" cy="59" r="4" fill="#333333" />
        <circle cx="548" cy="59" r="2" fill="#222222" />
        {/* Screen bottom bezel bar */}
        <rect x="266" y="288" width="564" height="10" rx="3" fill="#1A1A1A" />
        {/* Monitor edge highlight top */}
        <rect
          x="268"
          y="53"
          width="558"
          height="3"
          rx="1.5"
          fill="#3A3A3A"
          opacity="0.6"
        />

        {/* ── TYPING TEXT ON MONITOR SCREEN ── */}
        {typingLines[0] !== undefined && (
          <text
            x="306"
            y="116"
            fontFamily="Calibri, Candara, 'Segoe UI', sans-serif"
            fontSize="21"
            fontWeight="bold"
            fill="#111111"
          >
            {typingLines[0]}
            {typingLines.length === 1 && (
              <tspan fill="#111111" opacity={showCursor ? 1 : 0}>
                |
              </tspan>
            )}
          </text>
        )}
        {typingLines[1] !== undefined && (
          <text
            x="306"
            y="144"
            fontFamily="Calibri, Candara, 'Segoe UI', sans-serif"
            fontSize="21"
            fontWeight="bold"
            fill="#111111"
          >
            {typingLines[1]}
            {typingLines.length === 2 && (
              <tspan fill="#111111" opacity={showCursor ? 1 : 0}>
                |
              </tspan>
            )}
          </text>
        )}
        {typingLines[2] !== undefined && (
          <text
            x="306"
            y="172"
            fontFamily="Calibri, Candara, 'Segoe UI', sans-serif"
            fontSize="21"
            fontWeight="bold"
            fill="#111111"
          >
            {typingLines[2]}
            {typingLines.length === 3 && (
              <tspan fill="#111111" opacity={showCursor ? 1 : 0}>
                |
              </tspan>
            )}
          </text>
        )}
        {/* Screen decorative elements when not typing / waiting */}
        <rect
          x="306"
          y="196"
          width="120"
          height="3"
          rx="1.5"
          fill="#E0E0E0"
          opacity="0.6"
        />
        <rect
          x="306"
          y="204"
          width="90"
          height="3"
          rx="1.5"
          fill="#E0E0E0"
          opacity="0.4"
        />
        <rect
          x="306"
          y="212"
          width="140"
          height="3"
          rx="1.5"
          fill="#E0E0E0"
          opacity="0.3"
        />

        {/* ── SILVER PEN (left of monitor, on desk) ── */}
        <ellipse cx="232" cy="350" rx="52" ry="4" fill="rgba(0,0,0,0.05)" />
        <rect
          x="180"
          y="344"
          width="104"
          height="9"
          rx="4.5"
          fill="url(#penGrad2)"
        />
        <rect
          x="182"
          y="345"
          width="96"
          height="3"
          rx="1.5"
          fill="#F0F0F0"
          opacity="0.7"
        />
        <path d="M180 348.5 L172 353 L180 353Z" fill="#AAAAAA" />
        <rect
          x="280"
          y="344.5"
          width="10"
          height="7.5"
          rx="3.5"
          fill="#C0C0C0"
        />

        {/* ── EYEGLASSES (right of monitor, on desk) ── */}
        <ellipse cx="718" cy="349" rx="52" ry="5" fill="rgba(0,0,0,0.06)" />
        {/* Left arm */}
        <line
          x1="676"
          y1="337"
          x2="668"
          y2="349"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Left lens */}
        <ellipse
          cx="692"
          cy="332"
          rx="18"
          ry="11"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          fill="rgba(200,214,240,0.2)"
        />
        {/* Bridge */}
        <path
          d="M710 332 Q716 327 722 332"
          stroke="#1A1A1A"
          strokeWidth="2.2"
          fill="none"
        />
        {/* Right lens */}
        <ellipse
          cx="740"
          cy="332"
          rx="18"
          ry="11"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          fill="rgba(200,214,240,0.2)"
        />
        {/* Right arm */}
        <line
          x1="758"
          y1="337"
          x2="766"
          y2="349"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Lens reflections */}
        <path
          d="M682 327 Q686 323 690 326"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M730 327 Q734 323 738 326"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ════════════════════════════════════════
            RIGHT FLOWER POT (lavender flowers)
        ════════════════════════════════════════ */}
        {/* Pot shadow */}
        <ellipse cx="960" cy="350" rx="45" ry="6" fill="rgba(0,0,0,0.07)" />
        {/* Pot body */}
        <path
          d="M928 342 Q920 320 922 296 Q924 282 942 278 Q960 275 978 278 Q994 282 996 296 Q998 320 992 342Z"
          fill="url(#potGradR)"
        />
        {/* Pot rim */}
        <ellipse cx="960" cy="278" rx="36" ry="8" fill="#AA88CC" />
        <ellipse cx="960" cy="275" rx="32" ry="6" fill="#C0A0DC" />
        {/* Pot base */}
        <ellipse cx="960" cy="342" rx="32" ry="6" fill="#6A4A8A" />
        {/* Soil */}
        <ellipse cx="960" cy="275" rx="28" ry="5" fill="#5C3D1E" />
        {/* Stems */}
        <path
          d="M960 275 Q954 252 950 230 Q946 210 948 192"
          stroke="#5A8040"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M960 275 Q966 248 970 222 Q974 200 972 178"
          stroke="#4A7030"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M960 275 Q960 252 960 235 Q960 215 962 198"
          stroke="#5A8040"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaves */}
        <path d="M950 230 Q938 222 932 210 Q942 205 952 215Z" fill="#5A8040" />
        <path d="M970 222 Q982 212 988 200 Q977 198 969 208Z" fill="#4A7030" />
        {/* RIGHT FLOWER POT - LAVENDER FLOWERS */}
        <g
          className="flower-sway-right"
          style={{ transformOrigin: "960px 275px" }}
        >
          {/* Flower 1 (center) */}
          <circle cx="962" cy="192" r="5" fill="#C084FC" opacity="0.9" />
          <circle cx="962" cy="183" r="4.5" fill="#D8B4FE" opacity="0.85" />
          <circle cx="955" cy="188" r="4.5" fill="#A855F7" opacity="0.85" />
          <circle cx="969" cy="188" r="4.5" fill="#A855F7" opacity="0.85" />
          <circle cx="955" cy="197" r="4.5" fill="#C084FC" opacity="0.8" />
          <circle cx="969" cy="197" r="4.5" fill="#C084FC" opacity="0.8" />
          <circle cx="962" cy="190" r="3.5" fill="#FDE68A" />
          {/* Flower 2 */}
          <circle cx="948" cy="185" r="4.5" fill="#C084FC" opacity="0.9" />
          <circle cx="948" cy="177" r="4" fill="#D8B4FE" opacity="0.85" />
          <circle cx="942" cy="181" r="4" fill="#A855F7" opacity="0.8" />
          <circle cx="954" cy="181" r="4" fill="#B06ED4" opacity="0.8" />
          <circle cx="948" cy="183" r="3" fill="#FDE68A" />
          {/* Flower 3 */}
          <circle cx="972" cy="173" r="4.5" fill="#D8B4FE" opacity="0.9" />
          <circle cx="972" cy="165" r="4" fill="#C084FC" opacity="0.85" />
          <circle cx="966" cy="169" r="4" fill="#A855F7" opacity="0.85" />
          <circle cx="978" cy="169" r="4" fill="#A855F7" opacity="0.8" />
          <circle cx="972" cy="171" r="3" fill="#FDE68A" />
          {/* Small buds */}
          <ellipse
            cx="952"
            cy="208"
            rx="4"
            ry="6"
            fill="#C084FC"
            opacity="0.7"
          />
          <ellipse
            cx="968"
            cy="205"
            rx="3.5"
            ry="5.5"
            fill="#A855F7"
            opacity="0.65"
          />
        </g>

        {/* ════════════════════════════════════════
            FISH BOWL (on desk, right area)
        ════════════════════════════════════════ */}
        {/* Bowl shadow */}
        <ellipse cx="834" cy="354" rx="56" ry="8" fill="rgba(0,0,0,0.08)" />
        {/* Bowl body */}
        <ellipse
          cx="834"
          cy="296"
          rx="54"
          ry="56"
          fill="rgba(186,220,255,0.12)"
          stroke="#B8D8F0"
          strokeWidth="2"
        />
        {/* Water */}
        <ellipse
          cx="834"
          cy="316"
          rx="50"
          ry="36"
          fill="rgba(176,216,255,0.18)"
          clipPath="url(#bowlClip2)"
        />
        {/* Water shimmer line */}
        <path
          d="M786 288 Q808 282 834 284 Q860 282 882 288"
          stroke="rgba(140,190,230,0.5)"
          strokeWidth="1.5"
          fill="none"
          className="water-shimmer"
        />
        {/* Bowl base/neck */}
        <ellipse
          cx="834"
          cy="348"
          rx="30"
          ry="8"
          fill="rgba(186,220,255,0.25)"
          stroke="#B8D8F0"
          strokeWidth="1.5"
        />
        {/* Bowl top opening */}
        <ellipse
          cx="834"
          cy="242"
          rx="44"
          ry="10"
          fill="rgba(186,220,255,0.15)"
          stroke="#C0DCEE"
          strokeWidth="1.5"
        />
        {/* Glass highlight */}
        <path
          d="M796 262 Q800 244 820 238"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M802 278 Q800 272 806 268"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Pebbles */}
        <ellipse cx="818" cy="340" rx="5" ry="3" fill="#C8B88A" />
        <ellipse cx="828" cy="344" rx="4.5" ry="2.5" fill="#BCAA80" />
        <ellipse cx="838" cy="342" rx="5" ry="3" fill="#C8B88A" />
        <ellipse cx="848" cy="344" rx="4" ry="2.5" fill="#BCAA80" />
        {/* Seaweed */}
        <path
          d="M820 340 Q815 320 818 306 Q822 292 818 278"
          stroke="#3A7A40"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M848 340 Q853 320 849 306 Q845 292 850 278"
          stroke="#4A8A50"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="815"
          cy="280"
          rx="8"
          ry="3.5"
          fill="#4A8A50"
          transform="rotate(-35 815 280)"
        />
        <ellipse
          cx="851"
          cy="278"
          rx="8"
          ry="3.5"
          fill="#3A7A40"
          transform="rotate(30 851 278)"
        />
        {/* FISH (swimming) */}
        <g clipPath="url(#bowlClip2)">
          <g className="fish-swim" style={{ transformOrigin: "834px 310px" }}>
            <ellipse cx="834" cy="310" rx="17" ry="8" fill="#E07A3A" />
            <path d="M851 310 L864 301 L864 319Z" fill="#C85A20" />
            <path d="M829 301 Q836 292 843 301" fill="#D06828" opacity="0.85" />
            <path d="M829 319 Q836 326 843 319" fill="#D06828" opacity="0.65" />
            <circle cx="821" cy="307" r="3" fill="white" />
            <circle cx="820.5" cy="306.5" r="1.5" fill="#222222" />
            <path
              d="M816 312 Q818 315 821 312"
              stroke="#B05018"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M829 307 Q836 303 842 307"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// ─── Section reveal wrapper ────────────────────────────────────────────────────
function Section({
  id,
  className = "",
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      style={style}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: DARK }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-[62px] flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="text-white font-bold text-base tracking-wide hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "0.04em",
          }}
          data-ocid="nav.link"
        >
          Sanjay Sugumar
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link text-white/85 text-sm font-medium tracking-wide hover:text-white transition-colors"
              data-ocid={`nav.${item.label.toLowerCase()}.link`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden border-t border-white/10"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 text-base font-medium hover:text-white transition-colors py-2.5 border-b border-white/5 last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-[62px]"
      style={{ backgroundColor: LAVENDER }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center gap-6">
        {/* Desk illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="w-full"
        >
          <DeskIllustration />
        </motion.div>

        {/* Name + resume buttons below desk */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl font-bold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sanjay Sugumar
          </h1>
          <p className="text-base text-black/65 max-w-md">
            Python Full Stack Developer &amp; Web Application Builder
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-1">
            <a
              href="/resume/sanjayresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.03] active:scale-95 shadow-md"
              style={{ backgroundColor: DARK }}
              data-ocid="hero.resume.button"
            >
              <ExternalLink size={15} />
              View Resume
            </a>
            <a
              href="/resume/sanjayresume.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-black text-sm font-semibold border-2 border-black/80 transition-all hover:bg-black hover:text-white hover:scale-[1.03] active:scale-95"
              data-ocid="hero.download.button"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#resume"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 flex flex-col items-center gap-1 text-black/35 hover:text-black/55 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}

// ─── Section heading helper ───────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl sm:text-4xl font-bold text-black text-center mb-3"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

// ─── Resume Section ───────────────────────────────────────────────────────────
function ResumeSection() {
  return (
    <Section
      id="resume"
      className="py-24"
      style={{ backgroundColor: LAVENDER }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading>Resume</SectionHeading>
        <p className="text-black/50 text-center text-sm mb-12">
          View or download my latest resume
        </p>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-10 shadow-sm text-center"
          data-ocid="resume.card"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-black"
            style={{ backgroundColor: "#EDE9F8" }}
          >
            <BookOpen size={28} />
          </div>
          <h3
            className="text-xl font-bold text-black mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sanjay Sugumar
          </h3>
          <p className="text-black/50 text-sm mb-8">
            Python Full Stack Developer &amp; Web Application Builder
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/resume/sanjayresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.03] shadow-sm"
              style={{ backgroundColor: DARK }}
              data-ocid="resume.view.button"
            >
              <ExternalLink size={15} />
              View Resume
            </a>
            <a
              href="/resume/sanjayresume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-black text-black text-sm font-semibold transition-all hover:bg-black hover:text-white hover:scale-[1.03]"
              data-ocid="resume.download.button"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
const LANG_COLOR: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#D4A017",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Java: "#B07219",
  "C++": "#F34B7D",
  Go: "#00ADD8",
  Rust: "#DEA584",
};

function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/sanjaysugumar2005/repos?sort=updated&per_page=6",
    )
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: unknown) => {
        if (Array.isArray(data)) setRepos(data as GitHubRepo[]);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section
      id="projects"
      className="py-24"
      style={{ backgroundColor: LAVENDER }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>
        <p className="text-black/50 text-center text-sm mb-12">
          Auto-fetched from{" "}
          <a
            href="https://github.com/sanjaysugumar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black/70 transition-colors"
          >
            GitHub
          </a>
        </p>

        {loading && (
          <div
            className="flex justify-center py-20"
            data-ocid="projects.loading_state"
          >
            <div className="w-10 h-10 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div
            className="text-center text-black/50 py-16"
            data-ocid="projects.error_state"
          >
            <p className="mb-3">Could not load projects.</p>
            <a
              href="https://github.com/sanjaysugumar2005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline"
            >
              <SiGithub size={16} />
              Visit GitHub Profile
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <p
            className="text-center text-black/50 py-16"
            data-ocid="projects.empty_state"
          >
            No public repositories found.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-bold text-black text-sm leading-snug flex-1">
                  {repo.name}
                </h3>
                {repo.language && (
                  <span
                    className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full font-semibold text-white"
                    style={{
                      backgroundColor: LANG_COLOR[repo.language] ?? "#888888",
                    }}
                  >
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-xs text-black/55 mb-4 flex-1 leading-relaxed">
                {repo.description ?? "No description provided."}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/6">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline"
                  data-ocid={`projects.github.link.${i + 1}`}
                >
                  <SiGithub size={13} />
                  View on GitHub
                </a>
                {repo.stargazers_count > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-black/45">
                    <Star size={11} />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
function EducationSection() {
  const items = [
    {
      icon: BookOpen,
      level: "Higher Secondary Education",
      institution: "Krishnaswamy Higher Secondary School",
      location: "Cuddalore, Tamil Nadu",
      degree: "Higher Secondary Certificate",
      year: "Completed 2023",
    },
    {
      icon: GraduationCap,
      level: "Undergraduate Degree",
      institution: "A.M. Jain College",
      location: "Meenambakkam, Chennai",
      degree: "BCA – Bachelor of Computer Applications",
      year: "Pursuing",
    },
  ];

  return (
    <Section
      id="education"
      className="py-24"
      style={{ backgroundColor: LAVENDER }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading>Education</SectionHeading>
        <p className="text-black/50 text-center text-sm mb-12">
          Academic background &amp; qualifications
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                data-ocid={`education.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-black"
                  style={{ backgroundColor: "#EDE9F8" }}
                >
                  <Icon size={26} />
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-black/38 mb-2">
                  {item.level}
                </span>
                <h3
                  className="text-base font-bold text-black mb-1 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.institution}
                </h3>
                <p className="text-sm text-black/55 mb-2">{item.location}</p>
                <p className="text-sm font-medium text-black/75 mb-4">
                  {item.degree}
                </p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-black/80"
                  style={{ backgroundColor: "#EDE9F8" }}
                >
                  {item.year}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <Section
      id="contact"
      className="py-24"
      style={{ backgroundColor: LAVENDER }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <SectionHeading>Get In Touch</SectionHeading>
        <p className="text-black/50 text-sm mb-12 max-w-xs mx-auto">
          Have a project in mind? Let's talk on Telegram.
        </p>

        <div
          className="rounded-3xl p-14"
          style={{ backgroundColor: "#BEBDE0" }}
          data-ocid="contact.card"
        >
          <a
            href="https://t.me/+T-DXigqqceI1ODBl"
            target="_blank"
            rel="noopener noreferrer"
            className="telegram-btn inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-base shadow-lg"
            style={{ backgroundColor: "#0088CC" }}
            data-ocid="contact.telegram.button"
          >
            <SiTelegram size={22} />
            Message Me on Telegram
          </a>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="py-8 px-6" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/65 text-sm">
          © {year} Sanjay Sugumar. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/sanjaysugumar2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white transition-colors"
            aria-label="GitHub profile"
            data-ocid="footer.github.link"
          >
            <SiGithub size={19} />
          </a>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: LAVENDER }}>
      <Navbar />
      <main>
        <HeroSection />
        <ResumeSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
