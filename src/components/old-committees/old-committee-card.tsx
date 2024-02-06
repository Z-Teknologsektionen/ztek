// OldCommitteeCard.tsx
import type { FC } from "react";
import type { RouterOutputs } from "~/utils/api";
import CommitteeImage from "../committees/CommitteeImage";

const OldCommitteeCard: FC<
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0]
> = ({ name, year, image, logo, members }) => (
  <div className="flex h-full max-w-xs justify-center rounded-lg px-2 py-4">
    <div className="space-y-4">
      <p>{image}</p>
      <CommitteeImage alt={`Gruppbild på ${name}`} filename={"/logo.png"} />
      <div className="space-y-1.5">
        <h2 className="text-center text-lg font-medium leading-none">{name}</h2>
      </div>
    </div>
  </div>
);

export default OldCommitteeCard;
