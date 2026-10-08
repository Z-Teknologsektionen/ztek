import {
  Building2,
  CalendarCheck,
  Camera,
  FileText,
  LogIn,
  Users,
} from "lucide-react";
import QuickLink from "./quicklink";

export default function QuickLinks() {
  return (
    <div className="mt-10 rounded-2xl bg-white p-5 shadow-xl">
      <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-neutral-700">
        Snabblänkar
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <QuickLink
          icon={Building2}
          label="Zaloonen bokning"
          link="/student-division/zaloonen#bookings"
          target=""
          rel=""
        />
        <QuickLink
          icon={Users}
          label="Sektionsorgan"
          link="/student-division/committees"
          target=""
          rel=""
        />
        <QuickLink
          icon={FileText}
          label="Dokument"
          link="/documents"
          target=""
          rel=""
        />
        <QuickLink
          icon={Camera}
          label="Z-foto"
          link="https://zfoto.ztek.se"
          target="_blank"
          rel="noopener noreferrer"
        />
        <QuickLink
          icon={LogIn}
          label="Logga in som aktiv"
          link="/active"
          target=""
          rel=""
        />
        <QuickLink
          icon={CalendarCheck}
          label="Schema converter"
          link="/student/schedule"
          target=""
          rel=""
        />
      </div>
    </div>
  );
}
