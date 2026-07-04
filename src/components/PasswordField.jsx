import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./task-app/Icons.jsx";

// Reusable masked password input with a show/hide eye toggle.
// Each instance manages its own visibility, so multiple fields toggle independently.
export default function PasswordField({ label, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 pr-10 text-[14px] text-slate-700 outline-none transition focus:border-[#2170eb] focus:bg-white"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-slate-600"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </label>
  );
}
