import { auth } from "@/lib/auth";
import AdminLayoutShell from "./AdminLayoutShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware already protects /admin but we retrieve the session user here securely 
  // to pass it down to the UI.
  const user = session?.user;

  return (
    <AdminLayoutShell user={user}>
      {children}
    </AdminLayoutShell>
  );
}
