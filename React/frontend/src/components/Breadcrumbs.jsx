import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm mb-4">
      <ol className="flex items-center gap-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.to ? (
              <Link to={item.to} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-gray-900">{item.label}</span>
            )}

            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
