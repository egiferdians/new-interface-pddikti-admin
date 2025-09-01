import { h } from "preact";
import { useState, useEffect, useRef } from 'preact/hooks';
import * as Icons from "lucide-react";

const menuData = [
  {
    label: 'Dashboard',
    link: '/',
    icon: 'LayoutDashboard'
  },
  {
    label: 'Pendidik',
    icon: 'SquareUser',
    children: [
      {
        label: 'Data Dosen',
        icon: "",
        link: '#',
        children: [
          { label: 'Pencarian Data Dosen', link: '#' },
          { label: 'Dosen Ganda', link: '#' },
          { label: 'Nomor Registrasi Ganda', link: '#' },
          { label: 'Dosen Yang Dihapus', link: '#' },
        ],
      },
    ],
  },
  {
    label: 'Kelembagaan',
    icon: 'Landmark',
    children: [
      {
        label: 'Lembaga non Satuan Pendidikan',
        link: '#',
      },
      {
        label: 'Penelusuran Data Perguruan Tinggi',
        link: '#',
      },
      {
        label: 'Manajemen Perguruan Tinggi',
        link: '#',
      },
      {
        label: 'Master Nomenklatur Prodi',
        link: '#',
      },
      {
        label: 'Profil Kelembagaan',
        link: '#',
      },
      {
        label: 'Satuan Manajemen Sumberdaya (SMS)',
        link: '#',
      },
      {
        label: 'Ajuan Statuta Perguruan Tinggi',
        link: '#',
      },
      {
        label: 'History Kelembagaan',
        link: '#',
      },
      {
        label: 'Daftar Statuta Perguruan Tinggi',
        link: '#',
      },
      {
        label: 'Ajuan Migrasi',
        link: '#',
      },
      {
        label: 'Prodi Yang Melebihi Kuota',
        link: '#',
      },
      {
        label: 'Ajuan Satuan Manajemen Sumberdaya (SMS)',
        link: '#',
      },
    ],
  },
  {
    label: 'Pembelajaran dan Kemahasiswaan',
    icon: 'CircleUser',
    children: [
      {
        label: 'Data Mahasiswa',
        link: '#',
      },
      {
        label: 'Rekap Mahasiswa Belum Dilaporkan',
        link: '#',
      },
      {
        label: 'Perubahan Data Mahasiswa',
        link: '#',
        children: [
          { label: 'Perubahan Data Pokok', link: '#' },
          { label: 'Perubahan Jenis Keluar', link: '#' },
        ],
      },
      {
        label: 'Ajuan Akreditasi/Sertifikasi Internasional',
        link: '#',
        children: [
          { label: 'Akreditasi Internasional', link: '#' },
          { label: 'Sertifikasi Internasional', link: '#' },
        ],
      },
      {
        label: 'Mahasiswa Inbound',
        link: '#',
      },
      {
        label: 'Verifikasi Data Mahasiswa Bermasalah',
        link: '#',
      },
      {
        label: 'Ajuan Dokumen Mahasiswa Lampau',
        link: '#',
      },
    ],
  },
  {
    label: 'Rekapitulasi',
    icon: 'BookOpenText',
    children: [
      {
        label: 'Rekap Pelaporan PDDikti',
        link: '#',
      },
      {
        label: 'Rekap Kelembagaan',
        link: '#',
      },
      {
        label: 'Rekap Kebutuhan Dosen',
        link: '#',
      },
    ],
  },
  {
    label: 'Manajemen',
    icon: 'FolderCog',
    children: [
        {
            label: 'Setting Aplikasi',
            link: '#'
        },
      {
        label: 'Manajemen User',
        link: '#',
        children: [
          { label: 'User', link: '/manajemen-akses/users' },
          { label: 'Role', link: '#' },
          { label: 'Hak Akses', link: '#' },
        ],
      },
      {
        label: 'Referensi',
        link: '#',
        children: [
          { label: 'Gelar Akademik', link: '#' },
        ],
      },
        {
            label: 'Registrasi User',
            link: '#'
        },
        {
            label: 'Monitoring User',
            link: '#'
        },
        {
            label: 'Log Feeder',
            link: '#'
        },
    ],
  },
  {
    label: 'Pelaporan',
    icon: 'FolderOpen',
    children: [
      {
        label: 'Akses Sinkronisasi',
        link: '#',
      },
      {
        label: 'Pengajuan Perbaikan Pelaporan PDDikti',
        link: '#',
      },
      {
        label: 'Generate Prefill',
        link: '#',
      },
      {
        label: 'Download Aplikasi',
        link: '#',
      },
      {
        label: 'Sync Khusus',
        link: '#',
      },
      {
        label: 'Dashboard Checkpoint Pelaporan',
        link: '#',
      },
      {
        label: 'Setting Tarik Data Table',
        link: '#',
      },
    ],
  },
];

function DynamicIcon({ name, className }) {
  const IconComponent = Icons[name]; // ambil berdasarkan string
  return IconComponent ? <IconComponent className={className} /> : null;
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

function MenuItem({ item, depth = 0 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const closeTimeout = useRef(null);

  useClickOutside(ref, () => setOpen(false));

  const hasChildren = item.children && item.children.length > 0;

  const onMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 300);
  };
  const onMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  return (
    <li
      className={`menu-item depth-${depth} ${open ? 'open' : ''}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a
        href={item.link || '#'}
        className="menu-link"
        aria-haspopup={hasChildren}
        aria-expanded={open}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        {item.icon != "" ? <DynamicIcon name={item.icon} className="w-5 h-5 mr-2" /> : "" }
        {item.label}
        {hasChildren && <span className="arrow">{open ? <Icons.ChevronUp className="w-3 h-3"/> : <Icons.ChevronDown className="w-3 h-3"/>}</span>}
      </a>
      {hasChildren && (
        <ul className={`submenu depth-${depth + 1}`}>
          {item.children.map((child, i) => (
            <MenuItem key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav>
        <div className="nav-container">
            <button
            className="mobile-menu-button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            >
            &#9776;
            </button>
            <ul className={`menu ${mobileMenuOpen ? 'open' : ''}`}>
            {menuData.map((item, i) => (
                <MenuItem key={i} item={item} />
            ))}
            </ul>
        </div>
    </nav>
  );
}