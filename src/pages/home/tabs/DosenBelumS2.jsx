import { useState } from 'preact/hooks';
import Accordion from "../../../components/Accordion";

export default function TabDosenBelumS2() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Accordion
          title="Dosen Dengan Jabatan Fungsional"
          defaultOpen={true}
        >
          Konten untuk Dosen Dengan Jabatan Fungsional
        </Accordion>

        <Accordion
          title="Dosen Jenjang Pendidik"
          defaultOpen={true}
        >
          Konten untuk Dosen Jenjang Pendidik
        </Accordion>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Accordion
          title="Dosen Ikatan Kerja"
          defaultOpen={true}
        >
          Konten untuk Dosen Ikatan Kerja
        </Accordion>

        <Accordion
          title="Dosen Sertifikasi"
          defaultOpen={true}
        >
          Konten untuk Dosen Sertifikasi
        </Accordion>
      </div>
    </div>
  );
}
