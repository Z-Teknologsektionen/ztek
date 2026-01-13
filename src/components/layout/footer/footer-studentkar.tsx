import Image from "next/image";
import type { FC } from "react";

export const FooterStudentkar: FC = () => {
  return (
    <div className="flex w-full flex-col items-center md:w-1/3">
      <h3 className="text-center text-lg font-semibold">En del av</h3>
      <a
        className="transition-all hover:opacity-75"
        href="https://chalmersstudentkar.se/"
        target="_blank"
      >
        <Image
          alt="CHS logo"
          className="h-32 w-72 rounded-lg object-contain"
          height={300}
          src="/CHS-standard-RGB-white.png"
          width={300}
        />
      </a>
    </div>
  );
};
