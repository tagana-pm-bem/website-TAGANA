import { Suspense } from "react";
import DetailClient from "./DetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <DetailClient />
    </Suspense>
  );
}
