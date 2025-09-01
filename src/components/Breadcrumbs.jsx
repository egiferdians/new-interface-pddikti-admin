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
      <ol className="flex flex-wrap items-center space-x-2 bg-purple-100 p-2 rounded">
        <li className="flex items-center">
          <Link href="/" className="text-[#41048e] hover:underline flex items-center gap-1">
            <Icons.Home className="w-4 h-4" />
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mr-2 text-gray-400">{"/"}</span>
              {isLast ? (
                <span className="text-[#41048e] font-bold text-weight-600 dark:text-gray-300 flex items-center">
                  {formatLabel(segment)}
                </span>
              ) : (
                <span className="text-gray-500 items-center">
                  {formatLabel(segment)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
