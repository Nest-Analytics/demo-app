import { useState } from "react";
import Logo from "../task-app/Logo.jsx";
import PasswordField from "../PasswordField.jsx";
import { validateCredentials, makeSession, saveSession } from "./auth-utils.js";

const EMPTY = { name: "", email: "", password: "", confirm: "" };

function Field({ label, type, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-slate-700 outline-none transition focus:border-[#2170eb] focus:bg-white"
      />
    </label>
  );
}

export default function AuthPage({ appName, onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const isSignup = mode === "signup";

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function switchMode() {
    setMode(isSignup ? "login" : "signup");
    setForm(EMPTY);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message = validateCredentials(mode, form);
    if (message) return setError(message);
    const session = makeSession(mode, form);
    saveSession(session);
    onAuthenticated(session);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f7] px-4 text-slate-900">
      <div className="w-full max-w-[400px] rounded-[16px] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo className="mb-3 h-12 w-12 rounded-[13px] shadow-[0_10px_20px_rgba(43,120,238,0.28)]" />
          <h1 className="text-[1.35rem] font-semibold tracking-[-0.03em]">
            {isSignup ? "Create your account" : `Welcome back to ${appName}`}
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            {isSignup ? "Start organising your work in minutes." : "Sign in to continue to your workspace."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup ? (
            <Field label="Full name" type="text" value={form.name} onChange={(v) => update("name", v)} placeholder="Alice Johnson" />
          ) : null}
          <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@company.com" />
          <PasswordField label="Password" value={form.password} onChange={(v) => update("password", v)} placeholder="••••••••" />
          {isSignup ? (
            <PasswordField label="Confirm password" value={form.confirm} onChange={(v) => update("confirm", v)} placeholder="••••••••" />
          ) : null}

          {error ? <p className="rounded-[10px] bg-red-50 px-3 py-2 text-[13px] text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-[10px] bg-[linear-gradient(180deg,#4492ff_0%,#2170eb_100%)] px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_6px_14px_rgba(32,112,235,0.16)] transition hover:brightness-105"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-slate-500">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button type="button" onClick={switchMode} className="font-medium text-[#2170eb] hover:underline">
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </div>
    </main>
  );
}
