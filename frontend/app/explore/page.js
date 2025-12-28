"use client";
import { useEffect, useState } from "react";
import { Code2, Globe, Search, Terminal } from "lucide-react"; // Optional: Lucide icons

export default function ExplorePage() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
          Explore Snippets
        </h1>
        <p className="text-gray-500 text-lg">
          Discover and reuse community-driven code solutions.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {snippets.map((s) => (
          <div 
            key={s._id} 
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Top Bar: Represents a code editor feel */}
            <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
               </div>
               <span className="text-[10px] uppercase font-mono text-gray-400 tracking-widest">
                 {s.language || "Plain Text"}
               </span>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {s.description || "No description provided for this snippet."}
              </p>
              
              {/* Language Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                <Terminal size={14} />
                {s.language}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
              <button className="w-full text-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {snippets.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 italic">No snippets found. Start contributing today!</p>
        </div>
      )}
    </main>
  );
}