import dayjs from "dayjs";
import Image from "next/image";
import { useState, type FC } from "react";
import { FaFile } from "react-icons/fa";
import { MdEdit, MdUpdate } from "react-icons/md";
import UpsertCommitteeAsActiveForm from "~/components/active/edit-committee/upsert-committee-as-active-form";
import CommitteeSocialIcon from "~/components/committees/committee-social-icon";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import IconNextToText from "~/components/layout/icon-next-to-text";
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
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateCommitteeAsActive } = useUpdateCommitteeAsActive({
    onSuccess: () => setIsOpen(false),
  });
  return (
    <div className="sticky top-2">
      <Card className="flex flex-col content-center items-center bg-cardBackground text-center ">
        <div className="self-end">
          <UpsertDialog
            description="Du som aktiv kan inte uppdatera alla fält, så som du vill ändra något mer än detta måste du kontakta en Webbgruppen"
            form={
              <UpsertCommitteeAsActiveForm
                key={committee.id}
                defaultValues={{
                  ...committee,
                  socialLinks: committee.socialLinks.map(
                    ({ iconVariant, linkText, url }) => ({
                      iconAndUrl: {
                        iconVariant,
                        url,
                      },
                      linkText,
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
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Uppdatera organ"
            trigger={
              <IconWithTooltip
                className="mr-1 mt-1 hover:fill-orange-500"
                icon={MdEdit}
                size={25}
                tooltipText="Redigera information"
              />
            }
          />
        </div>
        <CardHeader className="pt-0">
          <Avatar className="h-60 w-60">
            <AvatarImage className="object-cover" src={committee?.image} />
            <AvatarFallback className="bg-inherit" asChild>
              <Image
                alt={committee.name}
                height={300}
                src="/logo.png"
                width={300}
              />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="pt-2">{committee?.name}</CardTitle>
          <CardDescription>{committee.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="my-1 h-0.5" />
          <h2 className="text-sm">Sociala länkar</h2>
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

          <h2 className="text-sm">Länkat dokument</h2>
          {committee.document && (
            <IconWithTooltip
              className="fill-black"
              icon={FaFile}
              size={20}
              tooltipText={committee.document.title}
            />
          )}
          <Separator className="my-2 h-0.5" />

          <h2 className="text-sm">Beskrivning</h2>
          <CardDescription className="text-xs">
            {committee?.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription className="mt-4 flex flex-row gap-2 text-xs">
            <IconNextToText
              icon={MdUpdate}
              text={dayjs(committee.updatedAt).fromNow()}
              tooltipText="Uppdaterades senast"
            />
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
