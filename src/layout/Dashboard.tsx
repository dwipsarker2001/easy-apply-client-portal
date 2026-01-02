import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../features/sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainContent = () => (
  <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
    <div className="space-y-4">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="rounded bg-white p-4 shadow">
          Content Block #{i + 1}
        </div>
      ))}
    </div>
  </main>
);

const Dashboard = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      <Sidebar isOpen={sidebar} setSidebar={setSidebar} />
      <div className="flex w-full flex-col overflow-hidden">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <main className="bg-background border-border/30 flex-grow overflow-hidden border">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="bottom-right" hideProgressBar={true} className="text-sm" draggable />
    </div>
  );
};

export default Dashboard;
