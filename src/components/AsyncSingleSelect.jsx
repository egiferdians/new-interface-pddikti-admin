import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Icons from "lucide-react";

export default function AsyncSingleSelect({
  label = "Select Option",
  placeholder = "Select...",
  fetchOptions, // async function(query) => [{id, name}]
  optionKey = "id",
  optionLabel = "name",
  value = null,
  onChange,
  debounceMs = 300,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);

  const selectedItem = options.find((opt) => opt[optionKey] === value);

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

  // fetch options (debounced)
  useEffect(() => {
    if (!fetchOptions) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchOptions(query);
        setOptions(res || []);
      } catch (err) {
        console.error("Error fetching options", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  const selectValue = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div class="w-full" ref={containerRef}>
      {label && (
        <label class="block text-sm text-gray-600 mb-1">{label}</label>
      )}

      {/* Select Box */}
      <div
        class="relative w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 min-h-[38px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedItem ? (
          <span>{selectedItem[optionLabel]}</span>
        ) : (
          <span class="text-gray-400">{placeholder}</span>
        )}

        <Icons.ChevronDown
          class={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
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
            {loading ? (
              <li class="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
                <Icons.Loader2 class="w-4 h-4 animate-spin" /> Loading...
              </li>
            ) : options.length === 0 ? (
              <li class="px-3 py-2 text-sm text-gray-500">No results</li>
            ) : (
              options.map((opt) => (
                <li
                  key={opt[optionKey]}
                  onClick={() => selectValue(opt[optionKey])}
                  class={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-blue-600 hover:text-white ${
                    value === opt[optionKey] ? "bg-blue-100" : ""
                  }`}
                >
                  {opt[optionLabel]}
                  {value === opt[optionKey] && (
                    <Icons.Check class="w-4 h-4 text-blue-600" />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

{/* <AsyncSingleSelect2
  label="User"
  placeholder="Select user..."
  value={selectedUser}
  onChange={setSelectedUser}
  fetchOptions={async (query) => {
    // contoh API
    const res = await fetch(`/api/users?search=${query}`);
    return res.json(); // [{id, name}]
  }}
/> */}