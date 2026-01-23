import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-56 min-h-screen bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
