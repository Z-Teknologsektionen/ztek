import Link from "next/link";
import { externalLinks } from "~/data/external-links";

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
            <Link
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
              href={href}
            >
              <Icon className="text-neutral-700" size={28} />
              <span className="text-sm font-semibold text-neutral-800">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
