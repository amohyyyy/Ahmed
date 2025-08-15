import Link from "next/link";

export default function CourseCard({ course }:{ course:any }){
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{course.title}</h3>
        <span className="badge">{course.level || "عام"}</span>
      </div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{course.description}</p>
      <div className="flex justify-between text-sm">
        <span>دروس: {course.lessonsCount || 0}</span>
        <Link className="link" href={`/courses/${course.id}`}>عرض</Link>
      </div>
    </div>
  )
}
