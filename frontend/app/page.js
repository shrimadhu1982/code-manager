"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);

  // 🔐 login check + load snippets
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSnippets(data);
        } else {
          setSnippets([]);
        }
      })
      .catch(() => setSnippets([]));
  }, []);

  // 💾 save snippet
  const saveSnippet = async () => {
    if (!code) {
      alert("Enter code");
      return;
    }

    const res = await fetch("http://localhost:5000/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Snippet",
        code: code,
        language: "JavaScript"
      })
    });

    if (res.ok) {
      setCode("");
      window.location.reload();
    } else {
      alert("Save failed");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h2>Code Snippet Manager</h2>

      <textarea
        rows={5}
        cols={60}
        placeholder="Write code here..."
        value={code}
        onChange={e => setCode(e.target.value)}
      />

      <br /><br />
      <button onClick={saveSnippet}>Save Snippet</button>

      <hr />

      <h3>Saved Snippets</h3>

      {Array.isArray(snippets) &&
        snippets.map(s => (
          <pre
            key={s._id}
            style={{ background: "#eee", padding: 10, marginBottom: 10 }}
          >
            {s.code}
          </pre>
        ))}
    </main>
  );
}
