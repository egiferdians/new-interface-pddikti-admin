import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import * as Icons from 'lucide-react';

const softColors = {
  purple: '#9b59b6',    // ungu soft
  pink: '#d579d1',      // pink soft
  blue: '#5dade2',      // biru soft
  green: '#85e9a6'      // hijau soft
};

function AnimatedCount({ target, duration = 2000, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 30); // update tiap 30ms
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <div style={{ color, fontWeight: 'bold', fontSize: '2rem' }}>
      {count.toLocaleString()}
    </div>
  );
}

export default function Jumlahdata({ dosenAktif, mahasiswa, perguruanTinggi, userAktif }) {
  const [isPT, setIsPT] = useState(true);

  const data = {
    dosenAktif,
    mahasiswa,
    perguruanTinggi,
    userAktif
  };

  const cards = [
    { label: 'Dosen Aktif', value: data.dosenAktif, color: softColors.purple, icon: <Icons.UserCheck className="w-5 h-5 mr-2" /> },
    { label: 'Mahasiswa', value: data.mahasiswa, color: softColors.pink, icon: <Icons.Users className="w-5 h-5 mr-2" /> },
    { label: 'Perguruan Tinggi', value: data.perguruanTinggi, color: softColors.blue, icon: <Icons.Building className="w-5 h-5 mr-2" /> },
    { label: 'User Pengguna', value: data.userAktif, color: softColors.green, icon: <Icons.User className="w-5 h-5 mr-2" /> },
  ];

  const cardsPT = [
    { label: 'Dosen', value: data.dosenAktif, color: softColors.purple, icon: <Icons.UserCheck className="w-5 h-5 mr-2" /> },
    { label: 'Mahasiswa', value: data.mahasiswa, color: softColors.pink, icon: <Icons.Users className="w-5 h-5 mr-2" /> },
    { label: 'Jurusan', value: data.perguruanTinggi, color: softColors.blue, icon: <Icons.Building className="w-5 h-5 mr-2" /> },
    { label: 'Program Studi', value: data.userAktif, color: softColors.green, icon: <Icons.User className="w-5 h-5 mr-2" /> },
  ];

  return (
    <>
      {isPT ? 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          {/* Box Statistik Utama dengan gradient */}
          <div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-md text-white bg-gradient-to-r from-[#6317c3] to-[#d942c0]"
            style={{ minHeight: '300px' }}
          >
            <Icons.Landmark className="w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold mb-2 uppercase text-center">Politeknik Negeri Jakarta</h2>
            <p className="text-white/90 text-center">
              <b>Telepon :</b> 021-7270036 <b>Email :</b> humas@pnj.ac.id
            </p>
          </div>

          {/* Box Animate Count */}
          <div className="grid grid-cols-2 gap-4">
            {cardsPT.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md text-white"
                style={{ backgroundColor: card.color, minHeight: '140px' }}
              >
                <div className="flex items-center text-lg font-semibold mb-2">
                  {card.icon}
                  {card.label}
                </div>
                <AnimatedCount target={card.value} color="#fff" />
              </div>
            ))}
          </div>
        </div>
        :
        <div className="flex flex-wrap justify-center gap-4 my-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md text-white"
              style={{ backgroundColor: card.color, flex: '1 1 200px', minWidth: '180px' }}
            >
              <div className="flex items-center text-lg font-semibold mb-2">
                {card.icon}
                {card.label}
              </div>
              <AnimatedCount target={card.value} color="#fff" />
            </div>
          ))}
        </div>
      }
    </>
  );
}
