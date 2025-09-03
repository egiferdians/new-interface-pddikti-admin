import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Icons from "lucide-react";

export default function SearchableSelect2({
  label = "",
  placeholder = "Select...",
  options = [],
  value,
  onChange,
  optionKey = "id",
  optionLabel = "name",
  clearable = true,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const selected = options.find((opt) => opt[optionKey] === value) || null;

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          String(opt[optionLabel])
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  // Close dropdown ketika klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div class="w-full relative" ref={containerRef}>
      {label && (
        <label class="block text-sm text-gray-600 mb-1">{label}</label>
      )}

      {/* Select Box */}
      <div
        class="relative w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-900 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? (
          <span class="truncate">{selected[optionLabel]}</span>
        ) : (
          <span class="text-gray-400">{placeholder}</span>
        )}

        <div class="flex items-center gap-1">
          {clearable && selected && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              class="hover:bg-gray-100 rounded"
            >
              <Icons.X class="w-4 h-4 text-gray-500" />
            </button>
          )}
          <Icons.ChevronDown
            class={`w-4 h-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div class="absolute mt-1 w-full rounded-lg bg-white shadow-lg border border-gray-200 z-50">
          {/* Search Box */}
          <div class="p-2 border-b border-gray-200">
            <div class="relative">
              <input
                type="text"
                class="w-full pl-2 pr-2 py-1 text-sm rounded w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 transition"
                placeholder="Search..."
                value={query}
                onInput={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Options */}
          <ul class="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <li class="px-3 py-2 text-sm text-gray-500">No results</li>
            ) : (
              filtered.map((opt) => (
                <li
                  key={opt[optionKey]}
                  onClick={() => {
                    onChange(opt[optionKey]);
                    setOpen(false);
                    setQuery("");
                  }}
                  class={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-600 hover:text-white ${
                    selected && selected[optionKey] === opt[optionKey]
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  {opt[optionLabel]}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
