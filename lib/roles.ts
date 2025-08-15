import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserRole(uid:string){
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data().role || null;
  return null;
}
