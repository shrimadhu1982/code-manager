import Link from "next/link";
import "./globals.css"; // <--- THIS LINE IS THE KEY TO FIXING THE WHITE SCREEN

export const metadata = {
  title: "SnippetManager",
  description: "Share and discover code snippets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020617] text-gray-100 antialiased font-sans">
        <nav className="flex justify-between items-center px-10 py-5 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Snippet<span className="text-blue-500">Manager</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/explore" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-semibold px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-500/20"
            >
              Login
            </Link>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}