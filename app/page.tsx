import Link from "next/link";

export default function Home() {
  return (
    <section className="container py-12 grid lg:grid-cols-2 gap-6 items-center">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">منصة تعليمية قوية وحديثة</h1>
        <p className="text-slate-600 mb-6">
          تسجيل وأدوار، محتوى دورات، اختبارات بعدّاد لكل سؤال، تقارير لحظية، وإشعارات—جاهزة للتوسع.
        </p>
        <div className="flex gap-3">
          <Link href="/signup" className="btn btn-primary">ابدأ الآن</Link>
          <Link href="/courses" className="btn">تصفح الدورات</Link>
        </div>
      </div>
      <div className="card">
        <ul className="grid sm:grid-cols-2 gap-3">
          <li className="badge">أدوار: معلم/طالب/ولي أمر/مشرف</li>
          <li className="badge">اختبارات مؤقتة</li>
          <li className="badge">لوحة تحكم تفاعلية</li>
          <li className="badge">PWA + وضع داكن</li>
          <li className="badge">i18n (AR/EN)</li>
          <li className="badge">Realtime Firestore</li>
        </ul>
      </div>
    </section>
  );
}
