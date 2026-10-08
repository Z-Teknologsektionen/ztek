import { BarChart3, Database } from "lucide-react";

export default function ExternalLinks() {
  return (
    <section className="bg-neutral-700 px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-2 text-2xl font-extrabold text-white">
          Externa resurser
        </h2>
        <div className="mx-auto mb-8 h-px w-full bg-neutral-500" />
        <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-md">
          <a
            href="#"
            className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
          >
            <Database
              size={28}
              strokeWidth={1.5}
              className="text-neutral-700"
            />
            <span className="text-sm font-semibold text-neutral-800">
              Ladok
            </span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
          >
            <BarChart3
              size={28}
              strokeWidth={1.5}
              className="text-neutral-700"
            />
            <span className="text-sm font-semibold text-neutral-800">
              Tentastatistik
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
