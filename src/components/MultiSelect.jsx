import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Icons from "lucide-react";

export default function MultiSelect({
  label = "Select Options",
  placeholder = "Select...",
  options = [],
  values = [],
  onChange,
  optionKey = "id",
  optionLabel = "name",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const selectedItems = options.filter((opt) =>
    values.includes(opt[optionKey])
  );

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          String(opt[optionLabel])
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  // close ketika klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (id) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  const removeValue = (id) => {
    onChange(values.filter((v) => v !== id));
  };

  return (
    <div class="w-full" ref={containerRef}>
      {label && (
        <label class="block text-sm text-gray-600 mb-1">{label}</label>
      )}

      {/* Select Box */}
      <div
        class="relative w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm flex items-center flex-wrap gap-1 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 min-h-[38px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <span
              key={item[optionKey]}
              class="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
            >
              {item[optionLabel]}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(item[optionKey]);
                }}
              >
                <Icons.X class="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <span class="text-gray-400">{placeholder}</span>
        )}

        <div class="ml-auto flex items-center">
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
              <Icons.Search class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                class="w-full pl-8 pr-2 py-1 text-sm rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              filtered.map((opt) => {
                const isSelected = values.includes(opt[optionKey]);
                return (
                  <li
                    key={opt[optionKey]}
                    onClick={() => toggleValue(opt[optionKey])}
                    class={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-blue-600 hover:text-white ${
                      isSelected ? "bg-blue-100" : ""
                    }`}
                  >
                    {opt[optionLabel]}
                    {isSelected && (
                      <Icons.Check class="w-4 h-4 text-blue-600" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
