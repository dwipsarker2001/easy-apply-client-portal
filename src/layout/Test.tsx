import React, { useState } from "react";
import Sidebar from "@/features/sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router";

const Test: React.FC = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  return (
    <main className="flex h-screen w-screen overflow-x-hidden">
      <Sidebar isOpen={sidebar} setSidebar={setSidebar} />
      <div className="flex w-full flex-col overflow-hidden">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-grow overflow-hidden bg-slate-200">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Test;
