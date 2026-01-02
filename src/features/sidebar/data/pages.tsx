// import icons
import { Books02FreeIcons } from "@hugeicons/core-free-icons";
import { ItemProps } from "../types/book.types";

interface PagesProps {
  dashboard: string;
  pages: ItemProps[];
}

// export menu
const pages: PagesProps[] = [
  {
    dashboard: "easy-apply",
    pages: [
      {
        id: 1,
        label: "Dashboard",
        icon: Books02FreeIcons,
        link: "/easy-apply/dashboard",
        isActive: true,
        onClick: () => console.log("working properly"),
      },
      {
        id: 2,
        label: "Create Book",
        icon: Books02FreeIcons,
        link: "/easy-apply/create-book",
        isActive: false,
      },
    ],
  },
];

export default pages;
