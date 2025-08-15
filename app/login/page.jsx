"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e:React.FormEvent){
    e.preventDefault();
    setError("");
    try{
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    }catch(err:any){
      setError(err.message);
    }
  }
  return (
    <section className="container py-12">
      <div className="card max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h1>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">البريد</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div><label className="label">كلمة المرور</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">دخول</button>
        </form>
        <p className="text-center mt-4 text-sm">لا تملك حسابًا؟ <Link className="link" href="/signup">إنشاء حساب</Link></p>
      </div>
    </section>
  )
}
