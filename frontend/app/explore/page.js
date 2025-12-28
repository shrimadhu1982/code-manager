"use client";
import { useEffect, useState } from "react";
import { Code2, Globe, Search, Terminal, Zap, Shield, Cpu } from "lucide-react";

export default function ExplorePage() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-gray-200 py-16 px-6">
      {/* Hero & Features Section */}
      <header className="max-w-6xl mx-auto mb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
          The Developer Hub
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Snippets</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12">
          A high-performance repository for modern developers. Discover, share, and integrate battle-tested code solutions in seconds.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
          {[
            { icon: <Zap className="text-yellow-400" />, title: "Instant Access", desc: "Copy-paste production-ready logic." },
            { icon: <Shield className="text-blue-400" />, title: "Verified Code", desc: "Community vetted snippets for security." },
            { icon: <Cpu className="text-purple-400" />, title: "Multi-Lang", desc: "Support for 20+ programming languages." }
          ].map((feature, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors">
              <div className="mb-3">{feature.icon}</div>
              <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Snippets Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-5">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="text-blue-500" /> Community Library
          </h2>
          <span className="text-sm text-gray-500 font-mono">{snippets.length} results found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {snippets.map((s) => (
            <div 
              key={s._id} 
              className="group relative bg-[#0b1120] rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-500 flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur" />
              
              {/* Window Header */}
              <div className="relative bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <span className="text-[11px] font-bold uppercase font-mono text-blue-400 tracking-tighter">
                  {s.language || "txt"}
                </span>
              </div>

              {/* Content */}
              <div className="relative p-6 flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {s.description || "Detailed technical documentation and implementation logic for this specific code block."}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
                    <Terminal size={12} />
                    {s.language}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="relative px-6 py-4 bg-slate-900/30 border-t border-slate-800/50 mt-auto">
                <button className="group/btn w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                  View Snippet 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {snippets.length === 0 && (
          <div className="text-center py-32 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
            <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">No snippets found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or contribute a new one.</p>
          </div>
        )}
      </section>
    </main>
  );
}