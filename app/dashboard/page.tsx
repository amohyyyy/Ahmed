"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/roles";

export default function DashboardIndex(){
  const router = useRouter();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (user)=>{
      if(!user) return router.replace("/login");
      const role = await getUserRole(user.uid);
      if(role === "teacher") router.replace("/dashboard/teacher");
      else if(role === "student") router.replace("/dashboard/student");
      else if(role === "admin") router.replace("/dashboard/admin");
      else router.replace("/");
    });
    return ()=>unsub();
  },[router]);
  return <div className="container py-16"><div className="card text-center">جارِ التحميل…</div></div>
}
