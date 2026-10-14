import { GiSaloon } from "react-icons/gi";
import {
  MdCameraAlt,
  MdDescription,
  MdEventAvailable,
  MdGroups,
  MdLogin,
} from "react-icons/md";

export const homePageQuickLinks = [
  {
    icon: GiSaloon,
    label: "Zaloonen bokning",
    link: "/student-division/zaloonen#bookings",
    target: "",
    rel: "",
  },
  {
    icon: MdGroups,
    label: "Sektionsorgan",
    link: "/student-division/committees",
    target: "",
    rel: "",
  },
  {
    icon: MdDescription,
    label: "Dokument",
    link: "/documents",
    target: "",
    rel: "",
  },
  {
    icon: MdCameraAlt,
    label: "Z-foto",
    link: "https://zfoto.ztek.se",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: MdLogin,
    label: "Logga in som aktiv",
    link: "/active",
    target: "",
    rel: "",
  },
  {
    icon: MdEventAvailable,
    label: "Schema converter",
    link: "/student/schedule",
    target: "",
    rel: "",
  },
];
