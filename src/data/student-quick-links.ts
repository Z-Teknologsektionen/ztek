import type { IconType } from "react-icons";
import {
  MdAccountBalance,
  MdAnalytics,
  MdCalendarMonth,
  MdFacebook,
  MdMeetingRoom,
  MdReport,
  MdSchool,
} from "react-icons/md";

type StudentQuickLinkType = {
  href: string;
  icon: IconType;
  text: string;
  tooltip: string;
};

export const studentQuickLinks: StudentQuickLinkType[] = [
  {
    icon: MdCalendarMonth,
    href: "https://cloud.timeedit.net/chalmers/web/public/",
    text: "Schema",
    tooltip: "TimeEdit",
  },
  {
    icon: MdMeetingRoom,
    href: "https://cloud.timeedit.net/chalmers/web/b1/",
    text: "Grupprum",
    tooltip: "Boka grupprum på Chalmers",
  },
  {
    icon: MdSchool,
    href: "https://www.chalmers.se/utbildning/dina-studier/",
    text: "Studentportalen",
    tooltip: "Här kan du läsa mer om dina studier",
  },
  {
    icon: MdAnalytics,
    href: "https://stats.ftek.se/",
    text: "Tentastatistik",
    tooltip: "Här kan du se tentastatestik för de flesta kurser på Chalmers.",
  },
  {
    icon: MdAccountBalance,
    href: "https://www.student.ladok.se/student/app/studentwebb",
    text: "Ladok",
    tooltip: "Här kan du anmäla dig till tentor och se dina resultat.",
  },
  {
    icon: MdFacebook,
    href: "https://www.facebook.com/groups/activityatz",
    text: "Activity@Z",
    tooltip: "Här kommer information om olika arrangemang på sektionen",
  },
  {
    icon: MdReport,
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
    text: "Felanmäl lokal",
    tooltip:
      "Här kan du rapportera olika fel eller skador som du hittar på någon av Chalmers lokaler",
  },
];
