"use client";
import AuthGuard from "@/components/AuthGuard";
import NavbarDashboard from "@/components/NavbarDashboard";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function Teacher(){
  return (
    <AuthGuard allow={["teacher","admin"]}>
      <NavbarDashboard />
      <TeacherContent />
    </AuthGuard>
  );
}

function TeacherContent(){
  const [courses, setCourses] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    const q = query(collection(db, "courses"), where("owner", "==", auth.currentUser?.uid || ""));
    const unsub = onSnapshot(q, (snap)=>{
      const list:any[] = [];
      snap.forEach(d=>list.push({id:d.id, ...d.data()}));
      setCourses(list);
    });
    return ()=>unsub();
  },[]);

  async function createCourse(e:React.FormEvent){
    e.preventDefault();
    if(!title) return;
    await addDoc(collection(db, "courses"), { title, description, owner: auth.currentUser!.uid, lessonsCount: 0, createdAt: serverTimestamp() });
    setTitle(""); setDescription("");
  }

  return (
    <section className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">لوحة المعلم</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">إنشاء دورة</h2>
        <form onSubmit={createCourse} className="grid md:grid-cols-3 gap-3">
          <input className="input" placeholder="عنوان الدورة" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="input" placeholder="وصف مختصر" value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="btn btn-primary" type="submit">حفظ</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">دوراتي</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {courses.map((c)=>(<li key={c.id} className="border rounded-2xl p-3 flex justify-between">
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-slate-600">{c.description}</p>
              </div>
              <a className="link" href={`/courses/${c.id}`}>فتح</a>
            </li>
          ))}
          {courses.length===0 && <p className="text-slate-600">لا توجد دورات بعد.</p>}
        </ul>
      </div>
    </section>
  )
}
