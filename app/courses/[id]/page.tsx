"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export default function CoursePage(){
  const params = useParams();
  const id = params?.id as string;
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(()=>{
    async function run(){
      if(!id) return;
      const snap = await getDoc(doc(db, "courses", id));
      if(snap.exists()) setCourse({id, ...snap.data()})
    }
    run();
    const q = query(collection(db, "lessons"), where("courseId","==", id || "_"));
    const unsub = onSnapshot(q, (snap)=>{
      const list:any[] = [];
      snap.forEach(d=>list.push({id:d.id, ...d.data()}));
      setLessons(list);
    });
    return ()=>unsub();
  },[id]);

  async function addLesson(e:React.FormEvent){
    e.preventDefault();
    if(!title) return;
    await addDoc(collection(db, "lessons"), { title, courseId: id, createdAt: serverTimestamp() });
    setTitle("");
  }

  if(!course) return <div className="container py-16"><div className="card">جارِ التحميل…</div></div>;

  const isOwner = auth.currentUser?.uid === course.owner;

  return (
    <section className="container py-8 space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-slate-600">{course.description}</p>
      </div>

      {isOwner && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">إضافة درس</h2>
          <form onSubmit={addLesson} className="flex gap-3">
            <input className="input" placeholder="عنوان الدرس" value={title} onChange={e=>setTitle(e.target.value)} />
            <button className="btn btn-primary">حفظ</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">الدروس</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {lessons.map(l=>(
            <li key={l.id} className="border rounded-2xl p-3 flex justify-between">
              <span>{l.title}</span>
              <a className="link" href={`/lessons/${l.id}`}>فتح</a>
            </li>
          ))}
          {lessons.length===0 && <p className="text-slate-600">لا توجد دروس بعد.</p>}
        </ul>
      </div>
    </section>
  )
}
