// Shared brand mark — the same lightning glyph the browser favicon uses,
// so the in-app logo and the tab icon always match.
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="taskline-logo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fa3ff" />
          <stop offset="1" stopColor="#2b78ee" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#taskline-logo)" />
      <path fill="#fff" d="M13 3 L7 13 h3.5 l-1 8 L17 11 h-3.5 z" />
    </svg>
  );
}
