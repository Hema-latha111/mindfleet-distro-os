import { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";
import { useUserStore } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";
import { ComingSoon } from "@/components/shared/ComingSoon";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { lang } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[4999] bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64 w-full max-w-full overflow-x-hidden relative">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 flex flex-col items-center overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[1600px] p-4 md:p-6 pb-20 lg:pb-6">
            {lang === 'hi' ? <ComingSoon /> : children}
          </div>
        </main>
        {/* Mobile bottom nav */}
        <div className="lg:hidden">
          <MobileNav onMenuClick={() => setSidebarOpen(true)} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
