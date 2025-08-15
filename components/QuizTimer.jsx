"use client";
import { useEffect, useState } from "react";

export default function QuizTimer({ seconds, onEnd }:{ seconds:number, onEnd:()=>void }){
  const [left, setLeft] = useState(seconds);
  useEffect(()=>{
    if (left<=0) return onEnd();
    const t = setTimeout(()=>setLeft(left-1), 1000);
    return ()=>clearTimeout(t);
  },[left, onEnd]);
  const m = Math.floor(left/60).toString().padStart(2,"0");
  const s = (left%60).toString().padStart(2,"0");
  return <span className="badge">الوقت: {m}:{s}</span>;
}
