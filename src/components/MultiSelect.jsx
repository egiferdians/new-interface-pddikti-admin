import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import * as Icons from "lucide-react";

export default function MultiSelect({
  options = [],          // Array of objects: [{id: 1, name: "Option 1"}, ...]
  value = [],            // Array of selected IDs
  onChange,              // Callback saat value berubah
  optionKey = "id",      // property unik
  optionLabel = "name",  // property untuk ditampilkan
  placeholder = "Pilih opsi...",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef();

  const filteredOptions = query
    ? options.filter((opt) =>
        String(opt[optionLabel]).toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const toggleOption = (optId) => {
    if (value.includes(optId)) {
      onChange(value.filter((v) => v !== optId));
    } else {
      onChange([...value, optId]);
    }
  };

  // klik di luar menutup dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div class="relative" ref={containerRef}>
      <div
        class="w-full border rounded-lg px-3 py-2 cursor-pointer flex flex-wrap gap-1"
        onClick={() => setOpen(!open)}
      >
        {value.length === 0 && <span class="text-gray-400">{placeholder}</span>}
        {value.map((val) => {
          const opt = options.find((o) => o[optionKey] === val);
          return (
            <span
              key={val}
              class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded flex items-center gap-1"
            >
              {opt?.[optionLabel]}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(val);
                }}
              >
                <Icons.X size={12} />
              </button>
            </span>
          );
        })}
      </div>

      {open && (
        <div class="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow max-h-40 overflow-y-auto">
          <input
            type="text"
            class="w-full px-3 py-2 border-b border-gray-200 outline-none"
            placeholder="Cari..."
            value={query}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
          {filteredOptions.map((opt) => (
            <div
              key={opt[optionKey]}
              class={`px-3 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2 ${
                value.includes(opt[optionKey]) ? "bg-blue-50" : ""
              }`}
              onClick={() => toggleOption(opt[optionKey])}
            >
              <input
                type="checkbox"
                checked={value.includes(opt[optionKey])}
                readOnly
                class="cursor-pointer"
              />
              <span>{opt[optionLabel]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
