"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import CourseCard from "@/components/CourseCard";

export default function Courses(){
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(()=>{
    const q = query(collection(db, "courses"));
    const unsub = onSnapshot(q, (snap)=>{
      const list:any[] = [];
      snap.forEach(d=>list.push({id:d.id, ...d.data()}));
      setCourses(list);
    });
    return ()=>unsub();
  },[]);
  return (
    <section className="container py-8">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">الدورات</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.map(c=> <CourseCard key={c.id} course={c} />)}
          {courses.length===0 && <p className="text-slate-600">لا توجد دورات الآن.</p>}
        </div>
      </div>
    </section>
  )
}
