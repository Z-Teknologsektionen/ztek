import { BarChart3, Calendar, Database, Mail, Palette, Printer, ShieldCheck, Users, Utensils, X } from "lucide-react";

const externalLinks = [
  { href: "https://student.ladok.se/student/app/studentwebb/", label: "Ladok", icon: Database },
  { href: "https://stats.ftek.se/", label: "Tentastatistik", icon: BarChart3 },
  { href: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1", label: "Canvas", icon: Palette },
  { href: "https://outlook.office.com/mail/?realm=chalmers.se", label: "Outlook", icon: Mail },
  { href: "https://papercut.chalmers.se/", label: "Utskrifter på Chalmers", icon: Printer },
  { href: "https://www.chalmerskonferens.se/ata/johanneberg/", label: "Chalmers Lunchmeny", icon: Utensils },
  { href: "https://cloud.timeedit.net/chalmers/web/student/", label: "Chalmers Boka Grupprum", icon: Users },
  { href: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7.html", label: "TimeEdit Scheman", icon: Calendar },
  { href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna", label: "Felanmäla lokaler", icon: X },
  { href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/trygg-pa-chalmers/", label: "Trygg på Chalmers", icon: ShieldCheck },
  
];

export default function ExternalLinks() {
  return (
    <section className="bg-neutral-700 px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-2 text-2xl font-extrabold text-white">
          Externa resurser
        </h2>
        <div className="mx-auto mb-8 h-px w-full bg-neutral-500" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {externalLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-neutral-700"
              />
              <span className="text-sm font-semibold text-neutral-800">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
