import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import SearchableSelect from "@/components/SearchableSelect";
import * as Icons from 'lucide-react';

const cls = (...classes) => classes.filter(Boolean).join(' ');

function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ---- Main Component ----
export default function UserTable({ apiUrl = 'https://jsonplaceholder.typicode.com/users' }) {
  // Table state
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Controls
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);

  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters
  const [filters, setFilters] = useState({ role: '', status: '', dateFrom: '', dateTo: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  // Focus trap for modal
  const modalRef = useRef(null);
  useEffect(() => {
    if (!isFilterOpen) return;
    const previouslyFocused = document.activeElement;
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
    return () => previouslyFocused?.focus();
  }, [isFilterOpen]);

  // Build query params for API
  const queryString = useMemo(() => {
    const q = new URLSearchParams();
    if (debouncedSearch) q.set('search', debouncedSearch);
    if (sortBy) q.set('sort', `${sortBy}:${sortDir}`);
    q.set('page', String(page));
    q.set('pageSize', String(pageSize));
    if (filters.role) q.set('role', filters.role);
    if (filters.status) q.set('status', filters.status);
    if (filters.dateFrom) q.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) q.set('dateTo', filters.dateTo);
    return q.toString();
  }, [debouncedSearch, sortBy, sortDir, page, pageSize, filters]);

  // Fetch data
  useEffect(() => {
    let aborted = false;
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Example: If using your own API, it should return shape: { data: [...], total: number }
        // For demo with jsonplaceholder, we will map results locally and simulate total.
        const url = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${queryString}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();

        // Map the API response to table expectations
        const { data, total: totalCount } = mapApiResponse(raw, {
          page, pageSize, search: debouncedSearch, sortBy, sortDir
        });

        if (!aborted) {
          setRows(data);
          setTotal(totalCount);
        }
      } catch (e) {
        if (!aborted) setError(e?.message || 'Failed to load data');
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    fetchData();
    return () => { aborted = true; };
  }, [apiUrl, queryString]);

  // Sorting toggle
  const onSort = (col) => {
    if (sortBy === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
  };

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const gotoPage = (p) => {
    const target = Math.min(Math.max(1, p), totalPages);
    setPage(target);
  };

  // Fungsi handle delete
  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");

      // Refresh data
      fetchData();
      setDeleteConfirm({ open: false, id: null });
      alert("User deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  const opt_roles = [
                  { id: "", name: "Semua" },
                  { id: "admin", name: "Admin" },
                  { id: "editor", name: "Editor" },
                  { id: "viewer", name: "Viewer" },
                ];
  const opt_status = [
                  { id: "", name: "Semua" },
                  { id: "active", name: "Active" },
                  { id: "inactive", name: "Inactive" },
                  { id: "pending", name: "Pending" },
                ];

  // UI
  return (
    <div class="min-h-screen bg-gray-100 py-0">
        <div class="bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 rounded-lg p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Judul */}
        <h1 class="text-xl sm:text-2xl font-semibold tracking-tight">Daftar Ajuan Draft</h1>

        {/* Search + Filter */}
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Input */}
          <div class="relative flex-1 sm:flex-none">
            <input
              type="text"
              value={search}
              onInput={(e) => {
                setPage(1);
                setSearch(e.currentTarget.value);
              }}
              placeholder="Cari name, email, phone..."
              class="w-full sm:w-72 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
            />
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ⌘K
            </span>
          </div>

            {/* Tombol Filter */}
            <button
              onClick={() => setIsFilterOpen(true)}
              class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 active:scale-[.99] w-full sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 3H2l8 9v7l4 2v-9l8-9z" />
              </svg>
              Filters
            </button>
          </div>
        </div>


          {/* Table */}
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-gray-600 border-b">
                  <th class="py-3 pr-6 w-12">No</th>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'company', label: 'Company' },
                  ].map((col) => (
                    <th key={col.key} class="py-3 pr-6">
                      <button
                        onClick={() => onSort(col.key)}
                        class={cls(
                          'group inline-flex items-center gap-1 font-medium',
                          sortBy === col.key ? 'text-gray-900' : 'text-gray-600'
                        )}
                      >
                        <span>{col.label}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class={cls('h-4 w-4 opacity-50 group-hover:opacity-100 transition', sortBy===col.key ? 'opacity-100' : '')}>
                          {sortBy === col.key && sortDir === 'asc' ? (
                            <path d="M10 3l-5 6h10l-5-6z" />
                          ) : (
                            <path d="M10 17l5-6H5l5 6z" />
                          )}
                        </svg>
                      </button>
                    </th>
                  ))}
                  <th class="py-3 pr-6  bg-white">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} class="py-10 text-center text-gray-500">Loading…</td></tr>
                ) : error ? (
                  <tr><td colSpan={4} class="py-10 text-center text-red-600">{error}</td></tr>
                ) : rows.length === 0 ? (
                  <tr><td colSpan={4} class="py-10 text-center text-gray-500">No data</td></tr>
                ) : (
                  rows.map((u, idx) => (
                    <tr key={u.id} class="border-b last:border-none hover:bg-gray-50/60">
                      <td class="py-3 pr-6 text-gray-700">{(page - 1) * pageSize + idx + 1}</td>
                      <td class="py-3 pr-6 font-medium text-gray-900">{u.name}</td>
                      <td class="py-3 pr-6 text-gray-700">{u.email}</td>
                      <td class="py-3 pr-6 text-gray-700">{u.phone}</td>
                      <td class="py-3 pr-6 text-gray-700">{u.company}</td>
                      <td class="py-3 pr-6 text-gray-700  bg-white">
                        <div class="flex gap-2">
                          <a href={`/users/${u.id}`} rel="noopener noreferrer" class="relative group">
                            <button class="p-1 rounded hover:bg-gray-100" aria-label="Detail">
                              <Icons.Eye size={18} className="text-blue-700" />
                            </button>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block rounded bg-gray-800 px-2 py-1 text-xs text-white z-50">
                              Detail
                            </div>
                          </a>

                          <a href={`/users/${u.id}/edit`} rel="noopener noreferrer" class="relative group">
                            <button class="p-1 rounded hover:bg-gray-100" aria-label="Edit">
                              <Icons.Pencil size={18} className="text-green-700" />
                            </button>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block rounded bg-gray-800 px-2 py-1 text-xs text-white z-50">
                              Edit
                            </div>
                          </a>

                          <div class="relative group">
                            <button
                              class="p-1 rounded hover:bg-gray-100"
                              aria-label="Delete"
                              onClick={() => setDeleteConfirm({ open: true, id: u.id })}
                            >
                              <Icons.Trash2 size={18} className="text-red-500" />
                            </button>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block rounded bg-gray-800 px-2 py-1 text-xs text-white z-50">
                              Hapus
                            </div>
                          </div>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {deleteConfirm.open && (
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div class="bg-white rounded-2xl shadow-lg p-6 w-96">
                <h2 class="text-lg font-semibold mb-4">Konfirmasi</h2>
                <p class="mb-6">Apakah Anda yakin ingin menghapus pengguna ini?</p>
                <div class="flex justify-end space-x-3">
                  <button
                    class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    onClick={() => setDeleteConfirm({ open: false, id: null })}
                  >
                    Batal
                  </button>
                  <button
                    class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDeleteUser(deleteConfirm.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Footer controls */}
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="text-sm text-gray-600">
              Menampilkan <span class="font-medium text-gray-900">{rows.length}</span> dari{' '}
              <span class="font-medium text-gray-900">{total}</span>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Baris per halaman */}
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-sm text-gray-600">Baris per halaman</label>
                <select
                  class="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.currentTarget.value));
                    setPage(1);
                  }}
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pagination */}
              <div class="flex items-center justify-center sm:justify-end gap-1 flex-wrap">
                <button
                  class="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
                  onClick={() => gotoPage(1)}
                  disabled={!canPrev}
                  aria-label="First page"
                >
                  «
                </button>
                <button
                  class="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
                  onClick={() => gotoPage(page - 1)}
                  disabled={!canPrev}
                  aria-label="Previous page"
                >
                  ‹
                </button>
                <span class="px-2 text-sm whitespace-nowrap">
                  Halaman {page} / {totalPages}
                </span>
                <button
                  class="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
                  onClick={() => gotoPage(page + 1)}
                  disabled={!canNext}
                  aria-label="Next page"
                >
                  ›
                </button>
                <button
                  class="rounded-lg border px-2 py-1 text-sm disabled:opacity-40"
                  onClick={() => gotoPage(totalPages)}
                  disabled={!canNext}
                  aria-label="Last page"
                >
                  »
                </button>
              </div>
            </div>

          </div>
        </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/40" onClick={() => setIsFilterOpen(false)} />
          <div ref={modalRef} role="dialog" aria-modal="true" class="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} class="rounded-full p-1 hover:bg-gray-100" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 10-1.06-1.06L10 8.94 6.28 5.22z"/></svg>
              </button>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <SearchableSelect
                  label="Role"
                  placeholder="Search role..."
                  options={opt_roles}
                  value={filters.role}
                  onChange={(role) => setFilters((f) => ({ ...f, role }))}
                  optionKey="id"
                  optionLabel="name"
                />
              </div>
              <div>
                <SearchableSelect
                  label="Status"
                  placeholder="Search status..."
                  options={opt_status}
                  value={filters.status}
                  onChange={(status) => setFilters((f) => ({ ...f, status }))}
                  optionKey="id"
                  optionLabel="name"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Joined from</label>
                <input type="date" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" value={filters.dateFrom} onChange={(e) => setFilters(f => ({...f, dateFrom: e.currentTarget.value}))} />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Joined to</label>
                <input type="date" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" value={filters.dateTo} onChange={(e) => setFilters(f => ({...f, dateTo: e.currentTarget.value}))} />
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <button class="text-sm text-gray-600 hover:text-gray-900" onClick={() => setFilters({ role: '', status: '', dateFrom: '', dateTo: '' })}>Reset</button>
              <div class="flex gap-2">
                <button class="rounded-lg border border-gray-200 px-3 py-2 text-sm" onClick={() => setIsFilterOpen(false)}>Cancel</button>
                <button
                  class="rounded-lg bg-purple-900 text-white px-4 py-2 text-sm hover:bg-purple-600"
                  onClick={() => { setIsFilterOpen(false); setPage(1); }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Adapter: Map API response to our table rows + total
function mapApiResponse(raw, { page, pageSize, search, sortBy, sortDir }) {
  // If your API already returns { data, total }, just return it:
  if (raw && Array.isArray(raw.data) && typeof raw.total === 'number') {
    const data = raw.data.map(toRow);
    return { data, total: raw.total };
  }

  // Demo adapter for jsonplaceholder (no server pagination/sort/search):
  const arr = Array.isArray(raw) ? raw : [];
  let data = arr.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    company: u.company?.name || '-',
  }));

  // Client-side search (demo only)
  if (search) {
    const q = search.toLowerCase();
    data = data.filter((r) =>
      [r.name, r.email, r.phone, r.company].some((v) => String(v).toLowerCase().includes(q))
    );
  }

  // Client-side sort (demo only)
  data.sort((a, b) => {
    const va = String(a[sortBy] ?? '').toLowerCase();
    const vb = String(b[sortBy] ?? '').toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const total = data.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageData = data.slice(start, end);
  return { data: pageData, total };
}

// ---- Optional: Keyboard shortcut for focusing search (⌘K / Ctrl+K)
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
    const hotkey = (isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k');
    if (hotkey) {
      const input = document.querySelector('input[placeholder^="Search"]');
      if (input) {
        e.preventDefault();
        input.focus();
      }
    }
  });
}
