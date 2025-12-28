"use client";
import { useState } from "react";
import { LockKeyhole, User, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    
    if (!username || !password) {
      setError("Please enter both a username and password");
      return;
    }

    setIsLoading(true);

   
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in as:", username);
      
      router.push("/explore"); 
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#020617] p-4 selection:bg-blue-500/30">
 
      <div className="absolute w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-[400px]">
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-2xl shadow-blue-900/40 transform hover:scale-105 transition-transform">
            <LockKeyhole className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">SnippetVault</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Secure access to your code repository</p>
        </div>

      
        <form 
          onSubmit={handleLogin} 
          className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="space-y-6">
            
            {error && (
              <div className="flex items-center gap-2 p-3 text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

           
            <div>
              <label className="text-[10px] font-bold text-slate-500 mb-2 block ml-1 uppercase tracking-[0.1em]">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  autoComplete="off"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 outline-none transition-all"
                  placeholder="e.g. dev_user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 mb-2 block ml-1 uppercase tracking-[0.1em]">
                Password
              </label>
              <div className="relative group">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Login
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

       
        <p className="text-center mt-10 text-slate-600 text-[11px] font-medium tracking-wide">
          SESSION SECURED VIA AES-256 ENCRYPTION
        </p>
      </div>
    </main>
  );
}