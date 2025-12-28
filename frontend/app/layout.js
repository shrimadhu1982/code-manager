import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
        <nav style={navStyle}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>SnippetManager</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={linkStyle}>Dashboard</Link>
            <Link href="/explore" style={linkStyle}>Explore</Link>
           
            <Link href="/login" style={loginBtnStyle}>Login</Link>
           
          </div>
        </nav>
        
       
        {children}
      </body>
    </html>
  );
}


const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 40px",
  background: "#111",
  color: "white",
  alignItems: "center",
  fontFamily: "sans-serif"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "0.9rem"
};

const loginBtnStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "0.9rem",
  border: "1px solid white",
  padding: "5px 15px",
  borderRadius: "4px"
};