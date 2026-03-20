"use client";

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
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