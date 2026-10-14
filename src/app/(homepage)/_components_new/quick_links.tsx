import { homePageQuickLinks } from "~/data/home-page-quick-links";
import QuickLink from "./quicklink";

export default function QuickLinks() {
  return (
    <div className="mt-10 rounded-2xl bg-white p-5 shadow-xl">
      <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-neutral-700">
        Snabblänkar
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {homePageQuickLinks.map(({ icon, label, link, target, rel }) => (
          <QuickLink
            key={label}
            icon={icon}
            label={label}
            link={link}
            target={target}
            rel={rel}
          />
        ))}
      </div>
    </div>
  );
}
