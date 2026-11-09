import { type FC } from "react";

import { homePageQuickLinks } from "~/data/home-page-quick-links";
import QuickLink from "./quicklink";

const QuickLinks: FC = () => {
  return (
    <div className="mt-10 rounded-2xl bg-cardBackground p-5 shadow-xl">
      <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-zBlack">
        Snabblänkar
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {homePageQuickLinks.map(({ icon, label, link, target, rel }) => (
          <QuickLink
            key={label}
            icon={icon}
            label={label}
            link={link}
            rel={rel}
            target={target}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
