import { h } from "preact";
import { Link } from "preact-router";
import * as Icons from "lucide-react";

export default function Breadcrumbs() {
  const path = window.location.pathname; // misal "/dashboard/users/edit"
  const segments = path.split("/").filter(Boolean); // ["dashboard", "users", "edit"]

  const formatLabel = (segment) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="text-sm font-medium mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 p-2 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-hide">
        <li className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="text-[#41048e] hover:underline flex items-center gap-1"
          >
            <Icons.Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center flex-shrink-0">
              <span className="mx-1 text-gray-400">{'>'}</span>
              {isLast ? (
                <span className="text-[#41048e] font-bold dark:text-gray-300 truncate max-w-[120px] sm:max-w-none">
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-gray-500 hover:underline truncate max-w-[100px] sm:max-w-none"
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
