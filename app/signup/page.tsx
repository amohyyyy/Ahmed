"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e:React.FormEvent){
    e.preventDefault();
    setError("");
    try{
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), { uid: cred.user.uid, email, role, createdAt: serverTimestamp() });
      router.replace("/dashboard");
    }catch(err:any){
      setError(err.message);
    }
  }
  return (
    <section className="container py-12">
      <div className="card max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h1>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">البريد</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div><label className="label">كلمة المرور</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          <div>
            <label className="label">الدور</label>
            <select className="input" value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="teacher">معلم</option>
              <option value="student">طالب</option>
              <option value="parent">ولي امر</option>
              <option value="admin">مشرف</option>
            </select>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">تسجيل</button>
        </form>
        <p className="text-center mt-4 text-sm">لديك حساب؟ <Link className="link" href="/login">دخول</Link></p>
      </div>
    </section>
  )
}
