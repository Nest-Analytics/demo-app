export const SESSION_KEY = "taskline-session-v1";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pure validation: returns an error message string, or null when the form is valid.
// No backend — this only enforces basic client-side rules for the demo.
export function validateCredentials(mode, form) {
  const name = (form.name || "").trim();
  const email = (form.email || "").trim();
  const password = form.password || "";
  const confirm = form.confirm || "";

  if (mode === "signup" && !name) return "Please enter your name.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (mode === "signup" && password !== confirm) return "Passwords do not match.";
  return null;
}

export function makeSession(mode, form) {
  const email = (form.email || "").trim();
  const name = mode === "signup" ? (form.name || "").trim() : email.split("@")[0];
  return { name, email };
}

export function loadSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
