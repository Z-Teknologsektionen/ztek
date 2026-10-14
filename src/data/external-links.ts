import {
  BarChart3,
  Calendar,
  Database,
  Mail,
  Palette,
  Printer,
  ShieldCheck,
  Users,
  Utensils,
  X,
} from "lucide-react";

export const externalLinks = [
  {
    href: "https://student.ladok.se/student/app/studentwebb/",
    label: "Ladok",
    icon: Database,
  },
  { href: "https://stats.ftek.se/", label: "Tentastatistik", icon: BarChart3 },
  {
    href: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1",
    label: "Canvas",
    icon: Palette,
  },
  {
    href: "https://outlook.office.com/mail/?realm=chalmers.se",
    label: "Outlook",
    icon: Mail,
  },
  {
    href: "https://papercut.chalmers.se/",
    label: "Utskrifter på Chalmers",
    icon: Printer,
  },
  {
    href: "https://www.chalmerskonferens.se/ata/johanneberg/",
    label: "Chalmers Lunchmeny",
    icon: Utensils,
  },
  {
    href: "https://cloud.timeedit.net/chalmers/web/student/",
    label: "Chalmers Boka Grupprum",
    icon: Users,
  },
  {
    href: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7.html",
    label: "TimeEdit Scheman",
    icon: Calendar,
  },
  {
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
    label: "Felanmäla lokaler",
    icon: X,
  },
  {
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/trygg-pa-chalmers/",
    label: "Trygg på Chalmers",
    icon: ShieldCheck,
  },
];
