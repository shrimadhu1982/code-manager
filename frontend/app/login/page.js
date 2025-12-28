"use client";
import { useState } from "react";
import { LockKeyhole, User, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    /* This main tag is what handles the centering */
    <main className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] p-4">
      
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-900/40">
            <LockKeyhole className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SnippetVault</h1>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block ml-1">Password</label>
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
              Login
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Use <span className="text-slate-300 font-mono">admin / admin</span> to enter
        </p>
      </div>
    </main>
  );
}