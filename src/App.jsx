import { useState } from "react";
import Workspace from "./components/task-app/Workspace.jsx";
import AuthPage from "./components/auth/AuthPage.jsx";
import { loadSession, clearSession } from "./components/auth/auth-utils.js";
import { useTaskline } from "./components/task-app/useTaskline.js";
import { APP_NAME } from "./components/task-app/data.js";

export default function App() {
  const [session, setSession] = useState(() => loadSession());
  const taskline = useTaskline();

  function handleSignOut() {
    clearSession();
    setSession(null);
  }

  if (!session) {
    return <AuthPage appName={APP_NAME} onAuthenticated={setSession} />;
  }

  return <Workspace taskline={taskline} onSignOut={handleSignOut} />;
}
