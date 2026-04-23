import { useSearchParams } from "react-router-dom";

export default function Tabs({ tabs }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read tab from URL or default to first tab
  const active = searchParams.get("tab") || tabs[0].key;

  const setActive = (key) => {
    setSearchParams({ tab: key });
  };

  return (
    <div className="w-full">

      {/* Tab Headers */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-200
                ${
                  isActive
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }
              `}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}


