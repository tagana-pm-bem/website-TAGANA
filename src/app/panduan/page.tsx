"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PanduanPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/panduan/prabencana");
  }, [router]);

  return null;
}