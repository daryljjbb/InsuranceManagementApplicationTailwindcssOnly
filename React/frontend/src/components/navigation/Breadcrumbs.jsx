import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-gray-600 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <ChevronRight size={16} className="mx-2 text-gray-400" />
          )}

          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-800">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
