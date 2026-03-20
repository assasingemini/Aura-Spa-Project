import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { HomePage } from "./pages/landing/HomePage";
import { ServicesPage } from "./pages/landing/ServicesPage";
import { AboutPage } from "./pages/landing/AboutPage";
import { GalleryPage } from "./pages/landing/GalleryPage";
import { ContactPage } from "./pages/landing/ContactPage";
import { BlogListPage } from "./pages/blog/BlogListPage";
import { BlogDetailPage } from "./pages/blog/BlogDetailPage";
import { BookingPage } from "./pages/booking/BookingPage";
import { BookingSuccessPage } from "./pages/booking/BookingSuccessPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminBlog } from "./pages/admin/AdminBlog";
import { AdminBookings } from "./pages/admin/AdminBookings";
import { AdminCustomers } from "./pages/admin/AdminCustomers";
import { AdminMedia } from "./pages/admin/AdminMedia";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminContacts } from "./pages/admin/AdminContacts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "about", Component: AboutPage },
      { path: "gallery", Component: GalleryPage },
      { path: "contact", Component: ContactPage },
      { path: "blog", Component: BlogListPage },
      { path: "blog/:slug", Component: BlogDetailPage },
      { path: "booking", Component: BookingPage },
      { path: "booking/success", Component: BookingSuccessPage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "services", Component: AdminServices },
      { path: "blog", Component: AdminBlog },
      { path: "bookings", Component: AdminBookings },
      { path: "customers", Component: AdminCustomers },
      { path: "media", Component: AdminMedia },
      { path: "settings", Component: AdminSettings },
      { path: "contacts", Component: AdminContacts },
    ],
  },
]);
