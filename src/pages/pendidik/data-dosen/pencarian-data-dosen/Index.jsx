import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import MainLayout from "../../../../layouts/MainLayout";
import PageHeader from "@/components/PageHeader";
import { route } from "preact-router";
import SearchableSelect from "../../../../components/SearchableSelect";
import AsyncSingleSelect from "../../../../components/AsyncSingleSelect";
import MultiSelect from "../../../../components/MultiSelect";

const mockLecturers = [
  { name: 'Dr. Andi', faculty: 'Teknik', department: 'Informatika', educationLevel: 'S3' },
  { name: 'Prof. Budi', faculty: 'Ekonomi', department: 'Manajemen', educationLevel: 'S2' },
  { name: 'Dr. Citra', faculty: 'Kedokteran', department: 'Kedokteran Umum', educationLevel: 'S3' },
  { name: 'Dra. Dian', faculty: 'Teknik', department: 'Informatika', educationLevel: 'S2' },
];

const Index = ({ isAuthenticated, onLogout }) => {

    useEffect(() => {
          if (!isAuthenticated) route("/login", true);
        }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    lingkup_koordinasi: '',
    id_sp: '',
    bidang_ilmu: '',
    jenjang_pendidikan: '',
    jabatan_fungsional: '',
    jenis_sdm: '',
    keyword: '',
  });
  const [formDataEx, setFormDataEx] = useState({
    name: 'Dian',
    faculty: 'Teknik',
    department: 'Informatika',
    educationLevel: 'S2'
  });
  const [selectedIkatankerja, setSelectedIkatanKerja] = useState(["admin","editor"]);
  const [selectedStatusAktif, setSelectedStatusAktif] = useState(["admin"]);

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validasi realtime
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? 'Field ini wajib diisi' : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi semua field
    const newErrors = {};
    Object.keys(formDataEx).forEach((key) => {
      if (!formDataEx[key].trim()) newErrors[key] = 'Field ini wajib diisi';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setResults([]);

    // Simulasi API delay 1 detik
    setTimeout(() => {
      const filtered = mockLecturers.filter((lecturer) => {
        return (
          lecturer.name.toLowerCase().includes(formDataEx.name.toLowerCase()) &&
          lecturer.faculty === formDataEx.faculty &&
          lecturer.department === formDataEx.department &&
          lecturer.educationLevel === formDataEx.educationLevel
        );
      });

      setResults(filtered);
      setLoading(false);
    }, 1000);
  };

  const opt_lingkup_koordinasi = [
                  { id: "admin", name: "Admin" },
                  { id: "editor", name: "Editor" },
                  { id: "viewer", name: "Viewer" },
                ];

  return (
    <MainLayout onLogout={onLogout}>
    <PageHeader
        icon="UserStar"
        title="Pencarian Data Dosen"
        subtitle="Pencarian Data Pendidik & Tendik"
        actions={[
            { label: "Kembali", icon: "ArrowLeft", variant: "secondary", onClick: () => window.history.back() },
        ]}
    />
    <div class="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Form Card */}
      <div class="bg-white shadow-md rounded-lg p-6 md:p-8 w-full">
        <form onSubmit={handleSubmit} class="space-y-5">
            {/* Lingkup Koordinasi */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Lingkup Koordinasi</label>
                <SearchableSelect
                    placeholder="Pilih lingkup koordinasi..."
                    options={opt_lingkup_koordinasi}
                    value={formData.lingkup_koordinasi}
                    onChange={(lingkup_koordinasi) => setFormData((f) => ({ ...f, lingkup_koordinasi }))}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Perguruan Tinggi */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Perguruan Tinggi</label>
                <AsyncSingleSelect
                    placeholder="Search perguruan tinggi"
                    value={formData.id_sp}
                    onChange={(id_sp) => setFormData((f) => ({ ...f, id_sp }))}
                    fetchOptions={async (query) => {
                        const res = await fetch(`https://jsonplaceholder.typicode.com/users?search=${query}&sort=name%3Aasc&page=1&pageSize=10`);
                        return res.json(); // [{id, name}]
                    }}
                />
            </div>
            {/* Bidang Ilmu */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Bidang Ilmu</label>
                <SearchableSelect
                    placeholder="Pilih bidang ilmu..."
                    options={opt_lingkup_koordinasi}
                    value={formData.bidang_ilmu}
                    onChange={(bidang_ilmu) => setFormData((f) => ({ ...f, bidang_ilmu }))}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Jenjang Pendidikan */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Jenjang Pendidikan</label>
                <SearchableSelect
                    placeholder="Pilih jenjang pendidikan..."
                    options={opt_lingkup_koordinasi}
                    value={formData.jenjang_pendidikan}
                    onChange={(jenjang_pendidikan) => setFormData((f) => ({ ...f, jenjang_pendidikan }))}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Jabatan Fungsional */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Jabatan Fungsional</label>
                <SearchableSelect
                    placeholder="Pilih jabatan fungsional..."
                    options={opt_lingkup_koordinasi}
                    value={formData.jabatan_fungsional}
                    onChange={(jabatan_fungsional) => setFormData((f) => ({ ...f, jabatan_fungsional }))}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Ikatan Kerja */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Ikatan Kerja</label>
                <MultiSelect
                    placeholder="Pilih ikatan kerja..."
                    options={opt_lingkup_koordinasi}
                    value={selectedIkatankerja}
                    onChange={setSelectedIkatanKerja}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Status Aktif */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Status Aktif</label>
                <MultiSelect
                    placeholder="Pilih status aktif..."
                    options={opt_lingkup_koordinasi}
                    value={selectedStatusAktif}
                    onChange={setSelectedStatusAktif}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Jenis SDM */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Jenis SDM</label>
                <SearchableSelect
                    placeholder="Pilih jenis SDM..."
                    options={opt_lingkup_koordinasi}
                    value={formData.jenis_sdm}
                    onChange={(jenis_sdm) => setFormData((f) => ({ ...f, jenis_sdm }))}
                    optionKey="id"
                    optionLabel="name"
                />
            </div>
            {/* Kata Kunci */}
            <div class="flex flex-col">
                <label class="text-gray-700 font-medium mb-1" htmlFor="name">Kata Kunci</label>
                <input
                type="text"
                id="keyword"
                name="keyword"
                value={formData.keyword}
                onChange={handleChange}
                placeholder="Masukkan nama pendidikan & tendik, NIP atau NIDN"
                class={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 transition ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                />
            </div>

          {/* Submit */}
          <button
            type="submit"
            class="w-full bg-purple-900 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 shadow-md transition"
            disabled={loading}
          >
            {loading ? 'Mencari...' : 'Cari Dosen'}
          </button>
        </form>
      </div>

      {/* Hasil Pencarian Card */}
      {!loading && results.length > 0 && (
        <div class="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full max-w-lg mt-6">
          <h3 class="text-xl font-bold mb-4 text-gray-800">Hasil Pencarian</h3>
          <ul class="space-y-3">
            {results.map((lecturer, idx) => (
              <li key={idx} class="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50">
                <p class="font-semibold text-gray-800">{lecturer.name}</p>
                <p class="text-gray-600">{lecturer.faculty} - {lecturer.department} ({lecturer.educationLevel})</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loader */}
      {loading && <p class="mt-4 text-gray-500 text-center">Sedang mencari dosen...</p>}

      {/* Tidak ada hasil */}
      {!loading && results.length === 0 && Object.keys(errors).length === 0 && (
        <p class="mt-6 text-gray-500 text-center font-medium">Tidak ada hasil ditemukan.</p>
      )}
    </div>
    </MainLayout>
  );
};

export default Index;
