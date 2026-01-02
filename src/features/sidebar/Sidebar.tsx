import React, { useMemo } from "react";
import { useLocation } from "react-router";

import logo from "@/assets/company.svg";
import IconButton from "@/components/ui/IconButton";
import Menu from "./components/Menu";
import dashboards from "./data/dashboards";
import pagesData from "./data/pages";
import {
  Book02FreeIcons,
  Books02FreeIcons,
  MultiplicationSignFreeIcons,
} from "@hugeicons/core-free-icons";
import { useGetBooksQuery } from "../book/api";

// Sidebar props
interface SidebarProps {
  isOpen: boolean;
  setSidebar: (sidebar: boolean) => void;
}

// Component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setSidebar }) => {
  const location = useLocation();
  const currentDashboard = location.pathname.split("/")[1];
  const { data: books, isLoading, error } = useGetBooksQuery();

  // Get static pages based on current dashboard
  const matchedPages =
    pagesData.find((item) => item.dashboard === currentDashboard)?.pages ?? [];

  // Combine matchedPages + dynamic book pages
  const combinedPages = useMemo(() => {
    const dynamicPages =
      books?.map((book, index) => ({
        id: 1000 + index,
        label: book.name, // or book.name
        icon: Book02FreeIcons,
        link: "#",
        isActive: false,
        onClick: () => console.log("Clicked Book:", book.name),
        menu: [
          {
            id: 2,
            label: "Overview",
            icon: Books02FreeIcons,
            link: `${currentDashboard}/book/${book.id}`,
            isActive: false,
          },
          {
            id: 2,
            label: "Questions",
            icon: Books02FreeIcons,
            link: `${currentDashboard}/book/${book.id}/question`,
            isActive: false,
          },
        ],
      })) ?? [];

    return [...matchedPages, ...dynamicPages];
  }, [books, matchedPages, currentDashboard]);

  return (
    <aside
      className={`${isOpen && "translate-x-0"} sidebar z-99 -translate-x-full`}
    >
      {/* Header */}
      <section className="bg-primary flex items-center justify-between px-4 py-4">
        <img src={logo} className="h-6" alt="Company Logo" />
        <IconButton
          icon={MultiplicationSignFreeIcons}
          onClick={() => setSidebar(false)}
          className="text-white lg:invisible"
        />
      </section>

      {/* Dashboards */}
      <section className="px-3">
        <h4 className="text-secondary/75 mb-2 text-sm">Dashboards</h4>
        <Menu isDropdown={false} items={dashboards} />
      </section>

      {/* Pages + Dynamic Books */}
      <section className="px-3">
        <h4 className="text-secondary/75 mb-2 text-sm">Pages</h4>
        <Menu isDropdown={false} items={combinedPages} />
      </section>
    </aside>
  );
};

export default Sidebar;
