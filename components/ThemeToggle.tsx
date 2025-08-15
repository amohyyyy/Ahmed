"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(()=>{
    document.documentElement.classList.toggle("dark", dark);
  },[dark]);
  return (
    <button className="btn" onClick={()=>setDark(v=>!v)} aria-label="Toggle theme">
      {dark ? "وضع فاتح" : "وضع داكن"}
    </button>
  );
}
