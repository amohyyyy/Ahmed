"use client";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/roles";

export default function AuthGuard({ children, allow = ["teacher","student","parent","admin"] }: { children: ReactNode, allow?: string[] }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.replace("/login");
      const role = await getUserRole(user.uid);
      if (!role || !allow.includes(role)) return router.replace("/");
      setOk(true);
    });
    return () => unsub();
  }, [router, allow]);
  if (!ok) return <div className="container py-16"><div className="card text-center">جارِ التحقق…</div></div>;
  return <>{children}</>;
}
