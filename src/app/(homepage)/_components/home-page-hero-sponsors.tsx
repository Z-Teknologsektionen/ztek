import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { homePageSponsors } from "~/data/home-page-sponsors";

export const HomePageHeroSponsors: FC = () => (
  <div className="grid w-full grid-cols-2 gap-4">
    {homePageSponsors.map((sponsor) => (
      <Link
        key={sponsor.company}
        href={sponsor.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt={sponsor.company}
          className="object-contain object-center"
          height={200}
          src={sponsor.img}
          width={300}
        />
      </Link>
    ))}
  </div>
);
