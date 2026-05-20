import { useNavigate, useLocation } from "react-router-dom";
import { Home, Bookmark, Cpu, Video, DollarSign } from "lucide-react";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Feed" },
    { path: "/models", icon: Cpu, label: "Models" },
    { path: "/funding", icon: DollarSign, label: "Funding" },
    { path: "/videos", icon: Video, label: "Videos" },
    { path: "/saved", icon: Bookmark, label: "Saved" },
  ];

  return (
    <nav
      className="bottom-nav"
      data-testid="bottom-nav"
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              data-testid={`nav-${item.path === "/" ? "home" : item.label.toLowerCase()}`}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive ? "text-[#7c3aed]" : "text-[#333] hover:text-[#737373]"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} className="mb-0.5" />
              <span className={`text-[10px] tracking-wide uppercase ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-3 h-0.5 rounded-full mt-0.5 bg-[#7c3aed] shadow-[0_0_6px_rgba(124,58,237,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
