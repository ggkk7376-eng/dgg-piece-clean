"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export function LivePreview() {
  const router = useRouter();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL="http://localhost:3000"
    />
  );
}
