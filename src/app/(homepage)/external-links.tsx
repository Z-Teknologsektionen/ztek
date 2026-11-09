import { type FC } from "react";
import Link from "next/link";

import { externalLinks } from "~/data/external-links";

const ExternalLinks: FC = () => {
  return (
    <section className="bg-zBlack px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-2 text-2xl font-extrabold text-zWhite">
          Externa resurser
        </h2>
        <div className="mx-auto mb-8 h-px w-full bg-zDarkGray" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {externalLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl bg-zWhite p-6 hover:bg-cardBackground"
              href={href}
            >
              <Icon className="text-zBlack" size={28} />
              <span className="text-sm font-semibold text-zBlack">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExternalLinks;
