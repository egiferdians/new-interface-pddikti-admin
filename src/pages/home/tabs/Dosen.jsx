import { useState } from 'preact/hooks';
import Accordion from "../../../components/Accordion";
import Box from "../../../components/Box";
import DosenJabfung from './chart/DosenJabfung';
import DosenJenjangPendidik from './chart/DosenJenjangPendidik';
import DosenIkatanKerja from './chart/DosenIkatanKerja';
import DosenSertifikasi from './chart/DosenSertifikasi';
import * as Icons from 'lucide-react';

export default function TabDosen() {
  // State untuk setiap accordion
  const [openAccordions, setOpenAccordions] = useState({
    "1": true,
    "2": true,
  });

  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id], // toggle accordion ini tanpa mempengaruhi yang lain
    }));
  };

  return (
    <div className="box-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Box title="Dosen Jabatan Fungsional" detailUrl="#" detailLabel="Detail Diagram" icon={<Icons.UserStar className="w-5 h-5" />}>
            <DosenJabfung male={1500} female={1200} />
        </Box>
        <Box title="Dosen Jenjang Pendidik" detailUrl="#" detailLabel="Detail Diagram" icon={<Icons.UserStar className="w-5 h-5" />}>
            <DosenJenjangPendidik male={1209} female={1892} />
        </Box>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box title="Dosen Ikatan Kerja" detailUrl="#" detailLabel="Detail Diagram" icon={<Icons.UserStar className="w-5 h-5" />}>
            <DosenIkatanKerja maleTetap={167} femaleTetap={292} maleTidakTetap={190} femaleTidakTetap={201}  />
        </Box>
        <Box title="Dosen Sertifikasi" detailUrl="#" detailLabel="Detail Diagram" icon={<Icons.UserStar className="w-5 h-5" />}>
            <DosenSertifikasi male={627} female={426} />
        </Box>
      </div>
    </div>
  );
}
