"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import QuizTimer from "@/components/QuizTimer";
import { auth } from "@/lib/firebase";

export default function QuizPage(){
  const params = useParams();
  const id = params?.id as string;
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [finished, setFinished] = useState(false);

  useEffect(()=>{
    async function run(){
      const snap = await getDoc(doc(db, "quizzes", id));
      if(snap.exists()) setQuiz({id, ...snap.data()});
    }
    run();
    const q = query(collection(db, "questions"), where("quizId","==", id || "_"));
    const unsub = onSnapshot(q, (snap)=>{
      const list:any[] = [];
      snap.forEach(d=>list.push({id:d.id, ...d.data()}));
      setQuestions(list);
    });
    return ()=>unsub();
  },[id]);

  const current = questions[idx];

  async function next(){
    if(idx + 1 < questions.length) setIdx(idx+1);
    else await submit();
  }

  async function submit(){
    // Save attempt (simple)
    await addDoc(collection(db, "attempts"), {
      quizId: id,
      uid: auth.currentUser?.uid || null,
      answers,
      createdAt: serverTimestamp()
    });
    setFinished(true);
  }

  if(!quiz) return <div className="container py-16"><div className="card">جارِ التحميل…</div></div>;
  if(finished) return <div className="container py-16"><div className="card text-center">تم تسليم الاختبار. بالتوفيق!</div></div>;
  if(!current) return <div className="container py-16"><div className="card">لا توجد أسئلة بعد.</div></div>;

  return (
    <section className="container py-8 space-y-4">
      <div className="card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <p className="text-slate-600 text-sm">سؤال {idx+1} من {questions.length}</p>
        </div>
        <QuizTimer seconds={current.seconds || 60} onEnd={next} />
      </div>
      <div className="card space-y-3">
        <p className="font-medium">{current.text}</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {current.options?.map((opt:string, i:number)=>(
            <label key={i} className="border rounded-xl p-3 flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`q-${current.id}`}
                onChange={()=>setAnswers({...answers, [current.id]: opt})}
                checked={answers[current.id] === opt}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={next}>{idx+1 < questions.length ? "التالي" : "إنهاء"}</button>
        </div>
      </div>
    </section>
  )
}
