// import icons
import {
  Books02FreeIcons,
  ClothesFreeIcons,
  TeacherFreeIcons,
} from "@hugeicons/core-free-icons";
import { ItemProps } from "../types/book.types";

// export menu
const dashboards: ItemProps[] = [
  {
    id: 1,
    label: "Easy Apply",
    icon: Books02FreeIcons,
    link: "/easy-apply",
    isActive: true,
  },
];

export default dashboards;
