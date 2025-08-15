"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LessonPage(){
  const params = useParams();
  const id = params?.id as string;
  const [lesson, setLesson] = useState<any>(null);
  useEffect(()=>{
    async function run(){
      const snap = await getDoc(doc(db, "lessons", id));
      if(snap.exists()) setLesson({id, ...snap.data()});
    }
    run();
  },[id]);
  if(!lesson) return <div className="container py-16"><div className="card">جارِ التحميل…</div></div>;
  return (
    <section className="container py-8">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-slate-600">محتوى الدرس (نصي/فيديو) يمكنك تطويره لاحقًا.</p>
      </div>
    </section>
  )
}
