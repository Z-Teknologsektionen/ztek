import {
  MdBarChart,
  MdBuild,
  MdCalendarMonth,
  MdEmail,
  MdGroups,
  MdPalette,
  MdPrint,
  MdRestaurant,
  MdStorage,
  MdVerifiedUser,
} from "react-icons/md";

export const externalLinks = [
  {
    href: "https://student.ladok.se/student/app/studentwebb/",
    label: "Ladok",
    icon: MdStorage,
  },
  { href: "https://stats.ftek.se/", label: "Tentastatistik", icon: MdBarChart },
  {
    href: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1",
    label: "Canvas",
    icon: MdPalette,
  },
  {
    href: "https://outlook.office.com/mail/?realm=chalmers.se",
    label: "Outlook",
    icon: MdEmail,
  },
  {
    href: "https://papercut.chalmers.se/",
    label: "Utskrifter på Chalmers",
    icon: MdPrint,
  },
  {
    href: "https://www.chalmerskonferens.se/ata/johanneberg/",
    label: "Chalmers Lunchmeny",
    icon: MdRestaurant,
  },
  {
    href: "https://cloud.timeedit.net/chalmers/web/student/",
    label: "Chalmers Boka Grupprum",
    icon: MdGroups,
  },
  {
    href: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7.html",
    label: "TimeEdit Scheman",
    icon: MdCalendarMonth,
  },
  {
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
    label: "Felanmäla lokaler",
    icon: MdBuild,
  },
  {
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/trygg-pa-chalmers/",
    label: "Trygg på Chalmers",
    icon: MdVerifiedUser,
  },
];
