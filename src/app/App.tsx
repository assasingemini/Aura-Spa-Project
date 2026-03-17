"use client";

import { RouterProvider } from "react-router";
import { getRouter } from "./routes";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    setRouter(getRouter());
  }, []);

  if (!router) return null;

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            border: "1px solid rgba(122, 92, 255, 0.2)",
            color: "#1a1a2e",
          },
        }}
      />
    </>
  );
}