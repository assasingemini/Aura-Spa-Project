import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/30 via-white to-[#FEAEA7]/20 text-gray-900">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
