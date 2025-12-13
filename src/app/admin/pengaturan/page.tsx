import ProfilDesa from "./components/profilDesa";
import PengaturanAkun from "./components/akunSetting";
import Preferensi from "./components/preferensi";
import ZonaBahaya from "./components/zonaBahaya";


export default function PengaturanPage() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full px-30 mb-[100px]">
      <ProfilDesa />
      <PengaturanAkun />
      <Preferensi />
      <ZonaBahaya />
    </div>
  )
}