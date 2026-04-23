import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center group">

            {/* Icon */}
            {item.icon && (
              <item.icon
                size={16}
                className={`
                  mr-1 transition-all duration-200
                  ${item.active
                    ? "text-blue-600 scale-110"
                    : "text-gray-400 group-hover:text-blue-600 group-hover:scale-110"
                  }
                `}
              />
            )}

            {/* Label */}
            {item.to && !item.active ? (
              <Link
                to={item.to}
                className="
                  transition-colors duration-200
                  group-hover:text-blue-600
                "
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`
                  font-semibold transition-all duration-200
                  ${item.active
                    ? "text-blue-600 underline underline-offset-2"
                    : "text-gray-800 group-hover:text-blue-600"
                  }
                `}
              >
                {item.label}
              </span>
            )}

            {/* Animated Chevron Separator */}
            {index < items.length - 1 && (
              <ChevronRight
                size={16}
                className="
                  mx-2 text-gray-400
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                "
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}



