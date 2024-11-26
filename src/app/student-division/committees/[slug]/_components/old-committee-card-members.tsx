import type { FC } from "react";

type OldCommitteeCardMembersType = {
  members: {
    name: string;
    nickName: string;
    role: string;
  }[];
};

export const OldCommitteeCardMembers: FC<OldCommitteeCardMembersType> = ({
  members,
}) => {
  return (
    <div className="flex w-fit flex-col gap-1">
      {members.map((member, index) => (
        <div key={index} className="rounded border p-2">
          <h3 className="text-sm font-medium leading-none">
            {member.nickName || member.name}
          </h3>
          {member.nickName !== "" && (
            <p className="text-xs leading-none">{member.name}</p>
          )}
          <p className="text-xs italic leading-none">
            {member.role || "Ledamot"}
          </p>
        </div>
      ))}
    </div>
  );
};
