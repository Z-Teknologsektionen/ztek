import dayjs from "dayjs";
import { useState, type FC } from "react";
import { FaFile } from "react-icons/fa";
import { MdEdit, MdUpdate } from "react-icons/md";
import UpsertCommitteeAsActiveForm from "~/components/active/edit-committee/upsert-committee-as-active-form";
import CommitteeSocialIcon from "~/components/committees/committee-social-icon";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useUpdateCommitteeAsActive } from "~/hooks/mutations/useMutateCommittee";
import type { RouterOutputs } from "~/utils/api";

type CommitteeProps = {
  committee: RouterOutputs["committee"]["getOneByIdAsActive"];
};

export const UpdateCommitteeSection: FC<CommitteeProps> = ({ committee }) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const { mutate: updateCommitteeAsActive } = useUpdateCommitteeAsActive({
    onSuccess: () => setOpenFormId(null),
  });
  return (
    <Card className="flex flex-col content-center items-center bg-cardBackground text-center">
      <div className="mb-0 mr-2 mt-2 self-end">
        <UpsertDialog
          form={
            <UpsertCommitteeAsActiveForm
              key={committee.id}
              defaultValues={{
                ...committee,
                socialLinks: committee.socialLinks.map(
                  ({ iconVariant, order, url }) => ({
                    iconAndUrl: {
                      iconVariant,
                      url,
                    },
                    order,
                  }),
                ),
              }}
              formType="update"
              onSubmit={(updatedValues) =>
                updateCommitteeAsActive({
                  ...updatedValues,
                  id: committee.id,
                })
              }
            />
          }
          isOpen={openFormId === committee.id}
          setIsOpen={(isOpen) => {
            if (!isOpen) {
              setOpenFormId(null);
            } else {
              setOpenFormId(committee.id);
            }
          }}
          title="Uppdatera organ"
          trigger={
            <IconWithTooltip
              className="hover:fill-orange-500"
              icon={MdEdit}
              size={25}
              tooltipText="Redigera information"
            />
          }
        />
      </div>
      <CardHeader className="pt-0">
        <Avatar className="h-60 w-60">
          <AvatarImage src={committee?.image} />
          <AvatarFallback>Bild saknas</AvatarFallback>
        </Avatar>
        <CardTitle className="pt-2">{committee?.name}</CardTitle>
        <CardDescription>{committee.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-1 h-0.5" />
        <p className="text-sm">Sociala länkar</p>
        <div className="mt-2 flex flex-row flex-wrap justify-center gap-2">
          {committee.socialLinks.length !== 0 ? (
            committee.socialLinks.map((socialLink) => (
              <CommitteeSocialIcon {...socialLink} key={socialLink.url} />
            ))
          ) : (
            <CommitteeSocialIcon iconVariant="MAIL" url={committee.email} />
          )}
        </div>
        <Separator className="my-2 h-0.5" />

        <p className="text-sm">Länkade dokument</p>
        <IconWithTooltip
          className="fill-black"
          icon={FaFile}
          size={20}
          tooltipText={committee.document?.title || ""}
        />
        <Separator className="my-2 h-0.5" />

        <p className="text-sm">Beskrivning</p>
        <CardDescription className="text-xs">
          {committee?.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-4 flex flex-row gap-2 text-xs">
          <IconWithTooltip
            icon={MdUpdate}
            tooltipText={"Uppdaterades senast"}
          />
          {dayjs(committee.updatedAt).fromNow()}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
