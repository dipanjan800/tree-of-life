"use client";

import React from "react";
import ExplorerView from "@/components/ExplorerView";
import { useRouter } from "next/navigation";

export default function ExplorerPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <ExplorerView
        onBack={() => router.push("/")}
        onOpenStory={() => router.push("/")}
      />
    </div>
  );
}
