import dayjs from "dayjs";
import Image from "next/image";
import { useState, type FC } from "react";
import {
  MdAccountCircle,
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

type CommitteeProps = {
  committee: RouterOutputs["committee"]["getOneByIdAsActive"];
};
export const UpdateCommitteeMemberSection: FC<CommitteeProps> = ({
  committee,
}) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  const { mutate: updateMemberAsActive } = useUpdateMemberAsActive({
    onSuccess: () => setOpenFormId(null),
  });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {committee.members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col content-center items-center gap-2 rounded border bg-cardBackground"
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
              setIsOpen={(isOpen) => {
                if (!isOpen) {
                  setOpenFormId(null);
                } else {
                  setOpenFormId(member.id);
                }
              }}
              title={`Uppdatera ${member.name}`}
              trigger={
                // <Button>Press me</Button>
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
                height={1080}
                src="/logo.png"
                width={1920}
              />
            </AvatarFallback>
          </Avatar>
          <p className="text-center font-semibold">{member.name}</p>
          <div className="px-4">
            <p className="my-2 flex flex-row gap-2 text-xs font-semibold">
              <IconWithTooltip icon={MdAccountCircle} tooltipText={"Roll"} />
              {member.role}
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
