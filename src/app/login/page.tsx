"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!password) return;
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#F7F5F2",
      fontFamily: "'Geist', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: "#1a1a1a", borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#F7F5F2",
          }}>Sh</div>
          <div>
            <div style={{ color: "#1a1a1a", fontWeight: 500, fontSize: 14 }}>Shifted</div>
            <div style={{ color: "#aaa", fontSize: 11 }}>Internal access only</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              background: "#fff",
              border: `1px solid ${error ? "#f87171" : "#E0DCD7"}`,
              borderRadius: 9, padding: "11px 14px",
              color: "#1a1a1a", fontSize: 14, outline: "none",
              fontFamily: "inherit",
            }}
            autoFocus
          />
          {error && <p style={{ color: "#f87171", fontSize: 12, margin: 0 }}>Wrong password.</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            style={{
              background: "#1a1a1a", color: "#fff", border: "none",
              borderRadius: 9, padding: "11px", fontFamily: "inherit",
              fontWeight: 500, fontSize: 14,
              cursor: loading || !password ? "not-allowed" : "pointer",
              opacity: loading || !password ? 0.4 : 1,
              transition: "opacity 0.15s",
            }}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>
      </div>
    </div>
  );
}
