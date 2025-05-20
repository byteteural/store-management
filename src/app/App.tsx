import { Link } from "react-router";
export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 bg-base-100 rounded-box">
        {[
          { label: "หน้าร้าน", path: "/store" },
          { label: "สต็อก", path: "/stock" },
          { label: "รายรับ", path: "/income" },
          { label: "รายจ่าย", path: "/expense" },
          { label: "รายงาน", path: "/report" },
        ].map(({ label, path }) => (
          <Link key={label} to={path}>
            <button className="btn btn-primary text-xl px-6 py-4 min-w-[140px] min-h-[80px] text-primary-content w-full">
              {label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
