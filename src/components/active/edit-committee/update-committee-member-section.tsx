import dayjs from "dayjs";
import Image from "next/image";
import { useState, type FC } from "react";
import {
  MdAccountBox,
  MdBadge,
  MdCancel,
  MdCheck,
  MdEdit,
  MdEmail,
  MdPhone,
  MdUpdate,
} from "react-icons/md";
import { UpsertMemberAsActiveForm } from "~/components/active/edit-committee/upsert-member-as-active-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import IconNextToText from "~/components/layout/icon-next-to-text";
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
    <div className="sticky top-2 grid grid-cols-2 gap-4 md:grid-cols-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col content-center items-center gap-2 rounded border bg-cardBackground"
        >
          <div className="mb-0 mr-2 mt-2 self-end">
            <UpsertDialog
              description='Om du lämnar både "Namn" och "Kommitténamn" tomma så
        kommer personen inte visas på hemsidan. Om du vill att de ska visas ändå
        kan du sätta namnet till "Vakant"'
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
          <Avatar className="h-20 w-20 pt-0 sm:h-40 sm:w-40">
            <AvatarImage className="object-cover" src={member?.image} />
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
          <div className="gap-2">
            <IconNextToText
              className="my-2"
              icon={MdBadge}
              text={member.role}
              tooltipText="Roll"
            />
            <IconNextToText
              className="my-2"
              icon={MdAccountBox}
              text={member.nickName}
              tooltipText="Kommitténamn"
            />
            <IconNextToText
              className="my-2"
              icon={MdEmail}
              text={member.email}
              tooltipText="Email"
            />
            <IconNextToText
              className="my-2"
              icon={MdPhone}
              text={member.phone}
              tooltipText="Telefonnummer, kommer visas offentligt."
            />
            <Separator className="my-2 h-0.5" />
            <IconNextToText
              className="my-2"
              icon={member.nickName || member.name ? MdCheck : MdCancel}
              iconClassName={
                member.nickName || member.name ? "fill-success" : "fill-danger"
              }
              text={"Visas på hemsidan: "}
              textFirst={true}
              tooltipText={
                member.nickName || member.name
                  ? "Visas på hemsidan"
                  : "Lägg till namn eller kommitténamn för att visa medlemmen på hemsidan"
              }
            />
            <IconNextToText
              className="my-2"
              icon={MdUpdate}
              text={dayjs(member.updatedAt).fromNow()}
              tooltipText="Uppdaterades senast"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
