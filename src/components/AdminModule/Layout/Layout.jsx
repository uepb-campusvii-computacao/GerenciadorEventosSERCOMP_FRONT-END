import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EventProvider } from "../../../context/Event/EventContext";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <EventProvider>
      <div className="flex flex-row h-screen">
        <div className="h-full">
          <Sidebar sidebarOpen={sidebarOpen} />
        </div>
        <div className="w-full">
          <Dashboard
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="container mx-auto px-5 ">
            <Outlet />
          </div>
        </div>
      </div>
    </EventProvider>
  );
};

export default Layout;
