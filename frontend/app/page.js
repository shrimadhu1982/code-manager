"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  Code2, 
  Terminal, 
  Save, 
  Database, 
  LayoutGrid, 
  Copy, 
  Check,
  LogOut 
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // 🔐 Login check + load snippets
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => {
        setSnippets(Array.isArray(data) ? data : []);
      })
      .catch(() => setSnippets([]));
  }, [router]);

  // 💾 Save snippet logic
  const saveSnippet = async () => {
    if (!code) return;
    setIsSaving(true);

    try {
      const res = await fetch("http://localhost:5000/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Snippet",
          code: code,
          language: "JavaScript"
        })
      });

      if (res.ok) {
        const newSnippet = await res.json();
        // Add new snippet to top of list without refreshing
        setSnippets([newSnippet, ...snippets]);
        setCode("");
      } else {
        alert("Save failed");
      }
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // 📋 Copy to clipboard function
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 selection:bg-blue-500/30 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white flex items-center gap-3 tracking-tighter">
              <div className="p-2 bg-blue-600 rounded-lg">
                <LayoutGrid size={24} className="text-white" />
              </div>
              Vault<span className="text-blue-500 underline decoration-blue-500/30">Workspace</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium ml-1">Centralized storage for your reusable logic.</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Database size={12} className="text-green-500" />
                Database Connected
             </div>
             <button 
               onClick={handleLogout}
               className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
             >
               <LogOut size={20} />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Editor Section (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 transition-all hover:border-slate-700/50">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-black text-blue-500 uppercase tracking-widest">
                  <Terminal size={14} />
                  Main_Editor.js
                </div>
              </div>
              
              <textarea
                className="w-full bg-transparent p-8 text-blue-50 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-slate-800 min-h-[350px]"
                placeholder="// Type or paste your code here..."
                value={code}
                onChange={e => setCode(e.target.value)}
              />

              <div className="p-6 bg-slate-950/40 border-t border-slate-800 flex justify-between items-center">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider italic">
                  Draft saved locally
                </p>
                <button 
                  onClick={saveSnippet}
                  disabled={isSaving || !code}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/10 active:scale-95"
                >
                  {isSaving ? "Uploading..." : <><Save size={18} /> Push to Vault</>}
                </button>
              </div>
            </div>
          </div>

          {/* History Section (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-white font-black text-lg flex items-center gap-2">
                <PlusCircle size={20} className="text-blue-500" /> 
                History
              </h3>
              <span className="text-[10px] bg-slate-900 px-2 py-1 rounded-md text-slate-500 font-bold border border-slate-800 uppercase">
                {snippets.length} Items
              </span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
              {snippets.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-slate-800/50 rounded-[2.5rem] bg-slate-900/10">
                  <Code2 className="mx-auto text-slate-800 mb-4" size={48} />
                  <p className="text-slate-600 text-sm font-medium">Your vault is empty.</p>
                </div>
              ) : (
                snippets.map((s, idx) => (
                  <div 
                    key={s._id || idx} 
                    className="group bg-slate-900/40 border border-slate-800 hover:border-blue-500/40 p-5 rounded-2xl transition-all relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">JavaScript</div>
                        <div className="text-[9px] text-slate-600 font-mono tracking-widest">
                           ID: {s._id ? String(s._id).slice(-6) : "PENDING"}
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(s.code, s._id || idx)}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 transition-all"
                      >
                        {copiedId === (s._id || idx) ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                      <pre className="text-xs text-slate-400 font-mono line-clamp-3 leading-relaxed whitespace-pre-wrap">
                        {s.code}
                      </pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}