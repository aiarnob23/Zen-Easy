import { useState } from "react";
import {
  Home,
  Users,
  Briefcase,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home, path: "/admin/overview" },
    { id: "users", label: "Users", icon: Users, path: "/admin/users" },
    {
      id: "prof-services",
      label: "Professional Services",
      icon: Briefcase,
      path: "/admin/prof-services",
    },
    { id: "rent", label: "Rent Properties", icon: Building2, path: "/admin/rent" },
  ];

  const activeTab = menuItems.find((item) =>
    location.pathname.startsWith(item.path)
  )?.id;

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-300 z-40
          transition-all duration-300
          ${isCollapsed ? "w-20" : ""}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block"
          >
            <ChevronLeft
              className={`transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-3 border-t space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Settings</span>}
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
