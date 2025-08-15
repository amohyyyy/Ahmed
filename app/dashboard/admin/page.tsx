"use client";
import AuthGuard from "@/components/AuthGuard";
import NavbarDashboard from "@/components/NavbarDashboard";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Admin(){
  return (
    <AuthGuard allow={["admin"]}>
      <NavbarDashboard />
      <AdminContent />
    </AuthGuard>
  );
}

function AdminContent(){
  const [users, setUsers] = useState<any[]>([]);
  useEffect(()=>{
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snap)=>{
      const list:any[] = [];
      snap.forEach(d=>list.push({id:d.id, ...d.data()}));
      setUsers(list);
    });
    return ()=>unsub();
  },[]);

  return (
    <section className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">لوحة المشرف</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">المستخدمون</h2>
        <ul className="space-y-2">
          {users.map(u=>(
            <li key={u.id} className="border rounded-2xl p-3 flex justify-between">
              <span>{u.email}</span>
              <span className="badge">{u.role}</span>
            </li>
          ))}
          {users.length===0 && <p className="text-slate-600">لا يوجد مستخدمون.</p>}
        </ul>
      </div>
    </section>
  )
}
