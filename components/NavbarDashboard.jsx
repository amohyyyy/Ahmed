"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
export default function NavbarDashboard() {
  return (
    <div className="border-b bg-white dark:bg-slate-950">
      <div className="container h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="font-semibold">لوحة التحكم</Link>
          <Link href="/dashboard/teacher" className="link">المعلم</Link>
          <Link href="/dashboard/student" className="link">الطالب</Link>
          <Link href="/dashboard/admin" className="link">المشرف</Link>
        </div>
        <button className="btn" onClick={()=>signOut(auth)}>تسجيل الخروج</button>
      </div>
    </div>
  );
}
