import { ArrowLeft, Printer } from "lucide-react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Top bar - screen only */}
      <div className="no-print max-w-[860px] mx-auto mb-4 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          data-ocid="resume.link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors shadow"
          data-ocid="resume.primary_button"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* Resume paper */}
      <div
        className="resume-paper max-w-[860px] mx-auto bg-white shadow-xl"
        style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
      >
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="resume-header px-10 py-8 border-b-2 border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left: Name & title */}
            <div>
              <h1
                className="font-bold text-gray-900 mb-1 leading-none"
                style={{ fontSize: "26px" }}
              >
                Sanjay Sugumar
              </h1>
              <p
                className="text-gray-500 font-medium"
                style={{ fontSize: "13px" }}
              >
                Aspiring Python Developer
              </p>
            </div>

            {/* Right: Contact details */}
            <div
              className="flex flex-col gap-1 sm:text-right"
              style={{ fontSize: "11px" }}
            >
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <a href="tel:+917339476299" className="hover:text-gray-900">
                  +91 7339476299
                </a>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <a
                  href="mailto:sanjaysugumar2005@gmail.com"
                  className="hover:text-gray-900"
                >
                  sanjaysugumar2005@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <Globe className="w-3 h-3 flex-shrink-0" />
                <a
                  href="https://sanjay-sugumar-portfolio-qu2.caffeine.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 underline underline-offset-1"
                >
                  Portfolio
                </a>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <SiGithub className="w-3 h-3 flex-shrink-0" />
                <a
                  href="https://github.com/sanjaysugumar2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 underline underline-offset-1"
                >
                  github.com/sanjaysugumar2005
                </a>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end text-gray-600">
                <SiLinkedin className="w-3 h-3 flex-shrink-0" />
                <a
                  href="https://linkedin.com/in/sanjay-sugumar-9209933b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 underline underline-offset-1"
                >
                  linkedin.com/in/sanjay-sugumar-9209933b8
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="px-10 py-6 flex flex-col gap-5">
          {/* ── PROFESSIONAL SUMMARY ──────────────────────────────── */}
          <section data-ocid="resume.summary.section">
            <h2 className="resume-section-heading">Professional Summary</h2>
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontSize: "11.5px" }}
            >
              Motivated and detail-oriented Computer Applications student with
              foundational expertise in Python programming and front-end web
              development. Demonstrated ability to design and deploy personal
              projects using HTML and CSS. Eager to contribute to a dynamic
              development team while continuously expanding technical skills and
              knowledge of modern software practices.
            </p>
          </section>

          {/* ── TECHNICAL SKILLS ─────────────────────────────────── */}
          <section data-ocid="resume.skills.section">
            <h2 className="resume-section-heading">Technical Skills</h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-8"
              style={{ fontSize: "11.5px" }}
            >
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-44 flex-shrink-0">
                  Programming Languages:
                </span>
                <span className="text-gray-600">Python (Basics)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-44 flex-shrink-0">
                  Web Technologies:
                </span>
                <span className="text-gray-600">HTML, CSS</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-44 flex-shrink-0">
                  Core Concepts:
                </span>
                <span className="text-gray-600">
                  Variables, Data Types, Loops (for, while), Functions,
                  Operators
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-44 flex-shrink-0">
                  Tools & Platforms:
                </span>
                <span className="text-gray-600">GitHub, VS Code</span>
              </div>
            </div>
          </section>

          {/* ── PROJECTS ─────────────────────────────────────────── */}
          <section data-ocid="resume.projects.section">
            <h2 className="resume-section-heading">Projects</h2>
            <div className="flex flex-col gap-4">
              {/* Project 1 */}
              <div data-ocid="resume.projects.item.1">
                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontSize: "12px" }}
                  >
                    Personal Portfolio Website
                  </h3>
                  <span
                    className="text-gray-400 italic"
                    style={{ fontSize: "11px" }}
                  >
                    HTML · CSS
                  </span>
                </div>
                <ul
                  className="list-disc list-outside ml-4 text-gray-600 flex flex-col gap-0.5"
                  style={{ fontSize: "11.5px" }}
                >
                  <li>
                    Designed and developed a responsive personal portfolio
                    website using HTML and CSS to showcase professional profile,
                    skills, and projects.
                  </li>
                  <li>
                    Implemented clean UI layout with structured sections for
                    improved user experience and readability.
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div data-ocid="resume.projects.item.2">
                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    className="font-semibold text-gray-900"
                    style={{ fontSize: "12px" }}
                  >
                    Basic Python Programs
                  </h3>
                  <span
                    className="text-gray-400 italic"
                    style={{ fontSize: "11px" }}
                  >
                    Python
                  </span>
                </div>
                <ul
                  className="list-disc list-outside ml-4 text-gray-600 flex flex-col gap-0.5"
                  style={{ fontSize: "11.5px" }}
                >
                  <li>
                    Developed a collection of Python programs implementing
                    arithmetic operations, loops, and user-defined functions to
                    reinforce core programming concepts.
                  </li>
                  <li>
                    Practiced problem-solving through hands-on coding exercises
                    involving variables, data types, and operators.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── EDUCATION ────────────────────────────────────────── */}
          <section data-ocid="resume.education.section">
            <h2 className="resume-section-heading">Education</h2>
            <div className="flex flex-col gap-3">
              <div
                className="flex items-baseline justify-between"
                data-ocid="resume.education.item.1"
              >
                <div>
                  <span
                    className="font-semibold text-gray-900"
                    style={{ fontSize: "12px" }}
                  >
                    Bachelor of Computer Applications (BCA)
                  </span>
                  <span
                    className="text-gray-500 ml-2"
                    style={{ fontSize: "11.5px" }}
                  >
                    · A.M. Jain College, Chennai
                  </span>
                </div>
                <span
                  className="text-gray-500 flex-shrink-0 ml-4"
                  style={{ fontSize: "11px" }}
                >
                  Pursuing – Expected 2026
                </span>
              </div>
              <div
                className="flex items-baseline justify-between"
                data-ocid="resume.education.item.2"
              >
                <div>
                  <span
                    className="font-semibold text-gray-900"
                    style={{ fontSize: "12px" }}
                  >
                    Higher Secondary Certificate (HSC)
                  </span>
                  <span
                    className="text-gray-500 ml-2"
                    style={{ fontSize: "11.5px" }}
                  >
                    · Krishnaswamy Higher Secondary School
                  </span>
                </div>
                <span
                  className="text-gray-500 flex-shrink-0 ml-4"
                  style={{ fontSize: "11px" }}
                >
                  Completed 2023
                </span>
              </div>
            </div>
          </section>

          {/* ── ADDITIONAL ───────────────────────────────────────── */}
          <section data-ocid="resume.additional.section">
            <h2 className="resume-section-heading">Additional Information</h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-8"
              style={{ fontSize: "11.5px" }}
            >
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-20 flex-shrink-0">
                  Languages:
                </span>
                <span className="text-gray-600">English, Tamil</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-800 w-20 flex-shrink-0">
                  Strengths:
                </span>
                <span className="text-gray-600">
                  Quick Learner, Hardworking, Willing to Learn New Technologies
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Print styles injected via style tag */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          .resume-paper { box-shadow: none !important; max-width: 100% !important; }
          .bg-gray-100 { background: white !important; }
          a { color: inherit; text-decoration: underline; }
        }

        .resume-section-heading {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1a1a1a;
          border-bottom: 1.5px solid #d1d5db;
          padding-bottom: 4px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
