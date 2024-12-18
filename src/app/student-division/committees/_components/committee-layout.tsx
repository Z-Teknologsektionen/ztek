import type { CommitteeType } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";
import { CommitteeImage } from "~/components/committees/committee-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";

type CommitteeLayoutProps = {
  committees: {
    committeeType: CommitteeType;
    electionPeriods: number[];
    image: string;
    name: string;
    role: string;
    slug: string;
  }[];
};

export const CommitteesLayout: FC<CommitteeLayoutProps> = ({ committees }) => {
  return (
    <div className="mx-4 grid grid-cols-12 gap-4">
      {committees.map(({ name, slug, image, role }) => (
        <Link
          key={slug}
          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          href={`/student-division/committees/${slug}`}
        >
          <Card className="group shadow">
            <CardContent className="flex flex-col items-center justify-center gap-2 px-4 pt-2">
              <CommitteeImage alt={`${name}s logotyp`} filename={image} />
              <CardTitle className="decoration-zBlack underline-offset-2 group-hover:underline">
                {name}
              </CardTitle>
              <CardDescription>{role}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
