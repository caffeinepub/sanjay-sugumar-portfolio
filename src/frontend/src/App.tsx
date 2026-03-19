import { useEffect, useRef } from "react";

/* ---------- Smooth scroll helper ---------- */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ---------- Typing animation hook ---------- */
const TYPING_TEXT = "Hi and hello! I'm Sanjay Sugumar — glad you're here.";

function useTypingAnimation(ref: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timer = setTimeout(res, ms);
      });

    async function loop() {
      while (!cancelled) {
        for (let i = 0; i <= TYPING_TEXT.length; i++) {
          if (cancelled) return;
          el!.textContent = TYPING_TEXT.slice(0, i);
          await sleep(65 + Math.random() * 35);
        }
        await sleep(1000);
        for (let i = TYPING_TEXT.length; i >= 0; i--) {
          if (cancelled) return;
          el!.textContent = TYPING_TEXT.slice(0, i);
          await sleep(30);
        }
        await sleep(500);
      }
    }

    loop();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ref]);
}

/* ---------- Main App ---------- */
export default function App() {
  const typingRef = useRef<HTMLSpanElement>(null);
  useTypingAnimation(typingRef);

  return (
    <div
      style={{
        backgroundColor: "#E6E6FA",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans','Segoe UI',Arial,sans-serif",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#1a1a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: "60px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
        aria-label="Main navigation"
      >
        <span
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
          }}
        >
          Sanjay Sugumar
        </span>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {(["Resume", "Projects", "Education", "Contact"] as const).map(
            (label) => (
              <button
                key={label}
                type="button"
                data-ocid={`nav.${label.toLowerCase()}.link`}
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  background: "none",
                  border: "none",
                  color: "#cccccc",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#cccccc";
                  e.currentTarget.style.background = "none";
                }}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </nav>

      {/* ── Page Content ── */}
      <main style={{ paddingTop: "80px", paddingBottom: "4rem" }}>
        <div
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* ── Hero ── */}
          <section id="hero">
            <Box style={{ textAlign: "center", padding: "2.5rem 2rem" }}>
              {/* Monitor illustration */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <MonitorIllustration typingRef={typingRef} />
              </div>

              <h1
                style={{
                  fontSize: "clamp(1.9rem, 5vw, 2.75rem)",
                  fontWeight: 800,
                  color: "#000000",
                  margin: "0 0 0.5rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Sanjay Sugumar
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#555555",
                  margin: "0 0 2rem",
                  fontWeight: 500,
                }}
              >
                Python Full Stack Developer &amp; Web Application Builder
              </p>

              {/* Resume buttons only */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  justifyContent: "center",
                }}
              >
                <ResumeButton
                  data-ocid="hero.view_resume.button"
                  as="a"
                  href="/resume/sanjayresume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <EyeIcon /> View Resume
                </ResumeButton>
                <ResumeButton
                  data-ocid="hero.download_resume.button"
                  as="a"
                  href="/resume/sanjayresume.pdf"
                  download
                >
                  <DownloadIcon /> Download Resume
                </ResumeButton>
              </div>
            </Box>
          </section>

          {/* ── Resume section ── */}
          <section id="resume">
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1.5rem 2rem",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 0.25rem",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#000000",
                  }}
                >
                  Resume
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#666666",
                  }}
                >
                  View or download my latest resume
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <ResumeButton
                  data-ocid="resume.view.button"
                  as="a"
                  href="/resume/sanjayresume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <EyeIcon /> View Resume
                </ResumeButton>
                <ResumeButton
                  data-ocid="resume.download.button"
                  as="a"
                  href="/resume/sanjayresume.pdf"
                  download
                >
                  <DownloadIcon /> Download Resume
                </ResumeButton>
              </div>
            </Box>
          </section>

          {/* ── Projects ── */}
          <section id="projects">
            <SectionHeading>Projects</SectionHeading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              <ProjectCard
                data-ocid="projects.item.1"
                title="Personal Portfolio Website"
                description="A personal portfolio site showcasing my profile, projects, and skills"
                tags={["HTML", "CSS"]}
                href="https://github.com/sanjaysugumar2005"
              />
              <ProjectCard
                data-ocid="projects.item.2"
                title="Basic Python Programs"
                description="Collection of Python programs covering arithmetic, loops, and functions"
                tags={["Python"]}
                href="https://github.com/sanjaysugumar2005"
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <a
                data-ocid="projects.github.link"
                href="https://github.com/sanjaysugumar2005"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#7c3aed",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                View all on GitHub →
              </a>
            </div>
          </section>

          {/* ── Education ── */}
          <section id="education">
            <SectionHeading>Education</SectionHeading>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Box
                data-ocid="education.item.1"
                style={{ padding: "1.5rem 2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "#f3e8ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      flexShrink: 0,
                    }}
                  >
                    🎓
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: "0 0 0.2rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#000000",
                      }}
                    >
                      BCA — Bachelor of Computer Applications
                    </h3>
                    <p
                      style={{
                        margin: "0 0 0.5rem",
                        color: "#555555",
                        fontSize: "0.9rem",
                      }}
                    >
                      A.M. Jain College, Chennai
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        borderRadius: "999px",
                        padding: "0.2rem 0.75rem",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      Pursuing · Expected 2026
                    </span>
                  </div>
                </div>
              </Box>
              <Box
                data-ocid="education.item.2"
                style={{ padding: "1.5rem 2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "#f3e8ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      flexShrink: 0,
                    }}
                  >
                    📚
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: "0 0 0.2rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#000000",
                      }}
                    >
                      HSC — Higher Secondary Certificate
                    </h3>
                    <p
                      style={{
                        margin: "0 0 0.5rem",
                        color: "#555555",
                        fontSize: "0.9rem",
                      }}
                    >
                      Krishnaswamy Higher Secondary School
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        borderRadius: "999px",
                        padding: "0.2rem 0.75rem",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      Completed 2023
                    </span>
                  </div>
                </div>
              </Box>
            </div>
          </section>

          {/* ── Contact ── */}
          <section id="contact">
            <SectionHeading>Contact</SectionHeading>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <ContactRow
                data-ocid="contact.linkedin.link"
                href="https://linkedin.com/in/sanjay-sugumar-9209933b8"
                target="_blank"
                rel="noreferrer"
                icon={<LinkedInIcon size={20} />}
                label="LinkedIn"
                value="linkedin.com/in/sanjay-sugumar-9209933b8"
              />
              <ContactRow
                data-ocid="contact.github.link"
                href="https://github.com/sanjaysugumar2005"
                target="_blank"
                rel="noreferrer"
                icon={<GitHubIcon size={20} />}
                label="GitHub"
                value="github.com/sanjaysugumar2005"
              />
              <ContactRow
                data-ocid="contact.email.link"
                href="mailto:sanjaysugumar2005@gmail.com"
                icon={<EnvelopeIcon size={20} />}
                label="Email"
                value="sanjaysugumar2005@gmail.com"
              />
            </Box>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#1a1a2e",
          color: "#aaaacc",
          textAlign: "center",
          padding: "1.5rem",
          fontSize: "0.85rem",
        }}
      >
        <p style={{ margin: 0 }}>
          &copy; 2026 Sanjay Sugumar &middot; Built with ❤️
        </p>
      </footer>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────── Sub-components ─────────────────── */

function Box({
  children,
  style,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        padding: "2rem",
        color: "#000000",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.5rem",
        fontWeight: 800,
        color: "#000000",
        margin: "0 0 1rem",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

/* Resume-style button (white bg, black border → inverts on hover) */
function ResumeButton({
  children,
  as,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  as?: "a";
  onClick?: () => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const shared: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "1.5px solid #333333",
    background: "#ffffff",
    color: "#000000",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
    transition: "background 0.2s, color 0.2s",
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.background = "#000000";
    (e.currentTarget as HTMLElement).style.color = "#ffffff";
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.background = "#ffffff";
    (e.currentTarget as HTMLElement).style.color = "#000000";
  };

  if (as === "a") {
    return (
      <a
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        style={shared}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      onClick={onClick}
      style={shared}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {children}
    </button>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  href,
  ...rest
}: {
  title: string;
  description: string;
  tags: string[];
  href: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box
      {...rest}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.5rem",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "1rem",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "#555555",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {description}
      </p>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              background: "#e9d5ff",
              color: "#7c3aed",
              borderRadius: "999px",
              padding: "0.2rem 0.7rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-ocid={`${rest["data-ocid" as keyof typeof rest]}.button`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          color: "#000000",
          fontWeight: 600,
          fontSize: "0.82rem",
          textDecoration: "none",
          border: "1.5px solid #333333",
          borderRadius: "6px",
          padding: "6px 14px",
          width: "fit-content",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#000000";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#000000";
        }}
      >
        <GitHubIcon /> View on GitHub
      </a>
    </Box>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  target,
  rel,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  target?: string;
  rel?: string;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      href={href}
      target={target}
      rel={rel}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        textDecoration: "none",
        color: "#000000",
        padding: "0.75rem",
        borderRadius: "10px",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f5f0ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "#f3e8ff",
          color: "#7c3aed",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div
          style={{ fontWeight: 700, fontSize: "0.875rem", color: "#000000" }}
        >
          {label}
        </div>
        <div
          style={{ fontSize: "0.82rem", color: "#555555", marginTop: "0.1rem" }}
        >
          {value}
        </div>
      </div>
    </a>
  );
}

/* ── Monitor illustration ── */
function MonitorIllustration({
  typingRef,
}: {
  typingRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div style={{ position: "relative", width: "340px", maxWidth: "100%" }}>
      {/* Monitor outer body — white */}
      <div
        style={{
          background: "#ffffff",
          border: "2px solid #dddddd",
          borderRadius: "14px 14px 4px 4px",
          padding: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Screen — #f3e8ff */}
        <div
          style={{
            background: "#f3e8ff",
            borderRadius: "6px",
            padding: "1.5rem 1.25rem",
            minHeight: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Typing text in purple */}
          <div
            style={{
              fontFamily: "Calibri, 'Segoe UI', Arial, sans-serif",
              fontSize: "0.8rem",
              color: "#7c3aed",
              textAlign: "center",
              lineHeight: 1.6,
              minHeight: "1.4em",
              fontWeight: 600,
            }}
          >
            <span ref={typingRef} />
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.85em",
                background: "#7c3aed",
                marginLeft: "1px",
                verticalAlign: "text-bottom",
                animation: "blink-cursor 1s step-end infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stand neck */}
      <div
        style={{
          width: "28px",
          height: "22px",
          background: "#cccccc",
          margin: "0 auto",
        }}
      />
      {/* Stand base */}
      <div
        style={{
          width: "100px",
          height: "8px",
          background: "#cccccc",
          borderRadius: "4px",
          margin: "0 auto",
        }}
      />
      {/* Keyboard */}
      <div
        style={{
          width: "220px",
          height: "24px",
          background: "#e0e0e0",
          borderRadius: "5px",
          margin: "14px auto 0",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
      {/* Mouse */}
      <div
        style={{
          position: "absolute",
          right: "4px",
          bottom: "0px",
          width: "24px",
          height: "34px",
          background: "#e0e0e0",
          borderRadius: "12px 12px 10px 10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}

/* ─────────────────── Icons ─────────────────── */

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.831.091-.645.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.747-1.026 2.747-1.026.547 1.376.202 2.392.1 2.646.64.698 1.027 1.591 1.027 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EnvelopeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
