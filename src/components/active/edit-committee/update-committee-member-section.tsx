import dayjs from "dayjs";
import Image from "next/image";
import { useState, type FC } from "react";
import {
  MdAccountBox,
  MdBadge,
  MdEdit,
  MdEmail,
  MdPhone,
  MdUpdate,
} from "react-icons/md";
import { UpsertMemberAsActiveForm } from "~/components/active/edit-committee/upsert-member-as-active-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { useUpdateMemberAsActive } from "~/hooks/mutations/useMutateMember";
import type { RouterOutputs } from "~/utils/api";

type CommitteeMemberProps = {
  members: RouterOutputs["committee"]["getOneByIdAsActive"]["members"];
};
export const UpdateCommitteeMemberSection: FC<CommitteeMemberProps> = ({
  members,
}) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  const { mutate: updateMemberAsActive } = useUpdateMemberAsActive({
    onSuccess: () => setOpenFormId(null),
  });

  return (
    <div className="top-* sticky grid grid-cols-2 gap-4 md:grid-cols-3">
      {members.map((member) => (
        <div
          key={member.id}
          className=" flex flex-col content-center items-center gap-2 rounded border bg-cardBackground"
        >
          <div className="mb-0 mr-2 mt-2 self-end">
            <UpsertDialog
              form={
                <UpsertMemberAsActiveForm
                  defaultValues={member}
                  formType="update"
                  onSubmit={(updatedValues) =>
                    updateMemberAsActive({
                      ...updatedValues,
                      id: member.id,
                    })
                  }
                />
              }
              isOpen={openFormId === member.id}
              setIsOpen={(isOpen) => setOpenFormId(isOpen ? member.id : null)}
              title={`Uppdatera ${member.name}`}
              trigger={
                <IconWithTooltip
                  className="hover:fill-orange-500"
                  icon={MdEdit}
                  size={20}
                  tooltipText="Uppdatera medlem"
                />
              }
            />
          </div>
          <Avatar className="h-40 w-40 pt-0">
            <AvatarImage src={member?.image} />
            <AvatarFallback asChild>
              <Image
                alt={member.name}
                height={300}
                src="/logo.png"
                width={300}
              />
            </AvatarFallback>
          </Avatar>
          <p className="text-center font-semibold">{member.name}</p>
          <div className="px-4">
            <p className="my-2 flex flex-row gap-2 text-xs">
              <IconWithTooltip icon={MdBadge} tooltipText={"Roll"} />
              {member.role}
            </p>
            <p className="my-2 flex flex-row gap-2 text-xs">
              <IconWithTooltip
                icon={MdAccountBox}
                tooltipText={"Kommitténamn"}
              />
              {member.nickName}
            </p>
            <p className="my-2 flex flex-row gap-2 text-xs">
              <IconWithTooltip icon={MdEmail} tooltipText={"Email"} />
              {member.email}
            </p>
            <p className="my-2 flex flex-row gap-2 text-xs">
              <IconWithTooltip
                icon={MdPhone}
                tooltipText={"Telefonnummer, kommer visas offentligt."}
              />
              {member.phone}
            </p>
            <Separator className="my-2 h-0.5" />
            <p className="mb-2 flex flex-row gap-2 text-xs">
              <IconWithTooltip
                icon={MdUpdate}
                tooltipText={"Uppdaterades senast"}
              />
              {dayjs(member.updatedAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
