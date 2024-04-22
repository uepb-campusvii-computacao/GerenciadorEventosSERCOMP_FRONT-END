import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EventProvider } from "../../../context/Event/EventContext";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (    
    <div className="flex flex-row h-screen">
      <div className="h-full">
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>
      <div className="w-full">
        <Dashboard
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <EventProvider>
          <div className="container mx-auto px-5 ">
            <Outlet />
          </div>
        </EventProvider>
      </div>
    </div>    
  );
};

export default Layout;
