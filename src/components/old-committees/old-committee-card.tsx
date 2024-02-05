// OldCommitteeCard.tsx
import type { FC } from "react";
import type { RouterOutputs } from "~/utils/api";
import CommitteeImage from "../committees/CommitteeImage";

const OldCommitteeCard: FC<
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0]
> = ({ name, year, image, logo, members }) => (
  <div className="relative cursor-pointer">
    <div className="perspective-1000 transform-style-3d hover:rotate-y-180 relative transform transition-transform duration-700">
      <div className="backface-hidden rotate-y-0">
        {/* Front */}
        <div className="flex h-full max-w-xs justify-center rounded-lg px-4 py-4">
          <div className="space-y-4">
            <CommitteeImage
              alt={`Profilbild på ${name} ${year}`}
              filename={"/logo.png"}
            />
            <div className="space-y-1.5">
              <h2 className="text-center text-lg font-medium leading-none">
                {name}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="backface-hidden rotate-y-180 h-full rounded-lg bg-gray-200 p-4">
        {/* Back */}
        <h2 className="mb-4 text-center text-lg font-medium leading-none">
          Members
        </h2>
        <ul className="list-disc pl-6">
          {members.map((member) => (
            <li key={member.name} className="mb-2">
              <strong>{member.name}</strong> - {member.nickName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default OldCommitteeCard;
