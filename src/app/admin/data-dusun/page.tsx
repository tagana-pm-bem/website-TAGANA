import Card from "@/components/ui/card";
import PetaWilayah from "./components/petaWilayah";
import ManajemenRisiko from "./components/manajemenRisiko";
import PotensiBencana from "./components/potensiBencana";

export default function DataDusunPage() {
  return (
    <div className="w-full flex flex-col gap-8 mb-[100px]">
      <Card>
        <ManajemenRisiko />
      </Card>

      <Card>
        <PotensiBencana />
      </Card>
    </div>
  );
}
