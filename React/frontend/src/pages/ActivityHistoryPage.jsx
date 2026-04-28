import { useEffect, useState } from "react";
import axios from "axios";
import { activityIcon, activityBadge } from "../components/activityHelpers";

export default function ActivityHistoryPage() {
  const [activity, setActivity] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadActivity = async (pageNum = 1) => {
    const res = await axios.get(`http://localhost:8000/api/activity/?page=${pageNum}`);

    if (pageNum === 1) {
      setActivity(res.data.results);
    } else {
      setActivity((prev) => [...prev, ...res.data.results]);
    }

    setHasMore(res.data.next !== null);
  };

  useEffect(() => {
    loadActivity();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Activity History</h2>

      <div className="bg-white p-6 rounded shadow">
        <ul className="space-y-4">
          {activity.map((log) => (
            <li key={log.id} className="border-b pb-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">{activityIcon(log.action)}</div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {activityBadge(log.action)}
                    <p className="font-medium">{log.message}</p>
                  </div>

                  <p className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                loadActivity(nextPage);
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
