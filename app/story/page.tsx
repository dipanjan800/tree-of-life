"use client";

import React from "react";
import StoryOfLife from "@/components/story/StoryOfLife";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <StoryOfLife
        onComplete={() => router.push("/explorer")}
        onSkip={() => router.push("/explorer")}
      />
    </div>
  );
}
