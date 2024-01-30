import Link from "next/link";
import type { FC } from "react";
import CommitteeImage from "~/components/committees/CommitteeImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import type { RouterOutputs } from "~/utils/api";

interface ICommitteeLayout {
  committees: RouterOutputs["committee"]["getAll"] | undefined;
}

const CommitteeLayout: FC<ICommitteeLayout> = ({ committees }) => {
  return (
    <div className=" mx-4 grid grid-cols-12 gap-4">
      {committees?.map(({ name, slug, image, role }) => (
        <Link
          key={slug}
          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          href={`/student-division/committees/${slug}`}
        >
          <Card className="group shadow">
            <CardContent className="flex flex-col items-center justify-center gap-2 pt-2">
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

export default CommitteeLayout;
