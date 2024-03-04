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
import { cn } from "~/utils/utils";

type CommitteeMemberProps = {
  member: RouterOutputs["committee"]["getOneByIdAsActive"]["members"]["0"];
};
export const UpdateCommitteeMemberSection: FC<CommitteeMemberProps> = ({
  member,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateMemberAsActive } = useUpdateMemberAsActive({
    onSuccess: () => setIsOpen(false),
  });

  const visibleOnWebsite = Boolean(member.nickName || member.name);

  return (
    <div
      key={member.id}
      // lint bråkar, funkar inte att spara utan bg-cardBackground bråkar med mig
      // eslint-disable-next-line prettier/prettier
      className="bg-cardBackground flex flex-col content-center items-center gap-2 rounded border"
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
        <AvatarFallback className="bg-inherit" asChild>
          <Image alt={member.name} height={300} src="/logo.png" width={300} />
        </AvatarFallback>
      </Avatar>
      {member.name ? (
        <p className="text-center font-semibold">{member.name}</p>
      ) : (
        <p className="text-center text-gray-500">Namn saknas</p>
      )}
      <div className="gap-2">
        <IconNextToText
          className="my-2"
          icon={MdBadge}
          text={member.role}
          tooltipText="Roll"
        />
        <IconNextToText
          className={cn("my-2", member.nickName ? "" : "text-gray-500")}
          icon={MdAccountBox}
          text={member.nickName || "Ej inlagt"}
          tooltipText="Kommitténamn"
        />
        <IconNextToText
          className="my-2"
          icon={MdEmail}
          text={member.email}
          tooltipText="Email"
        />
        <IconNextToText
          className={cn("my-2", member.phone ? "" : "text-gray-500")}
          icon={MdPhone}
          text={member.phone || "Ej inlagt"}
          tooltipText="Telefonnummer"
        />
        <Separator className="my-2 h-0.5" />
        <IconNextToText
          className="my-2"
          icon={visibleOnWebsite ? MdCheck : MdCancel}
          iconClassName={visibleOnWebsite ? "fill-success" : "fill-danger"}
          text={"Visas på hemsidan: "}
          textFirst={true}
          tooltipText={
            visibleOnWebsite
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
  );
};
