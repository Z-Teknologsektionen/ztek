"use client";

import type { FC } from "react";
import { useState } from "react";
import { CommitteeImage } from "~/components/committees/committee-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { OldCommitteeCardMembers } from "./old-committee-card-members";

type OldCommitteeCardProps = {
  image: string;
  logo: string;
  members: {
    name: string;
    nickName: string;
    order: number;
    role: string;
  }[];
  name: string;
};

export const OldCommitteeCard: FC<OldCommitteeCardProps> = ({
  name,
  image,
  logo,
  members,
}) => {
  const [activeAccordion, setActiveAccordion] = useState("image");

  const shownImage = image || logo;
  const shouldShowImage = shownImage !== "";
  const shownImageTitle = image
    ? `Gruppbild på medlemmarna i ${name}`
    : `${name} - Logga`;
  return (
    <Accordion
      className="flex h-full w-64 flex-col justify-center rounded-lg border p-3"
      onValueChange={(value) =>
        setActiveAccordion(value !== "" ? value : "image")
      }
      type="single"
      value={activeAccordion}
      collapsible
    >
      <AccordionItem className="border-none" value="image">
        <AccordionContent>
          <Dialog>
            <DialogTrigger disabled={!shouldShowImage}>
              <CommitteeImage
                alt={shownImageTitle}
                className="object-contain"
                filename={shownImage}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{shownImageTitle}</DialogTitle>
              <CommitteeImage
                alt={shownImageTitle}
                className="h-auto w-full object-contain"
                filename={shownImage}
                height={750}
                width={750}
              />
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="members">
        <AccordionTrigger rotatedChevron>
          <p className="ml-2 font-medium">{name}</p>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-64 px-2">
            <div className="flex flex-col items-center gap-2">
              {logo && (
                <Dialog>
                  <DialogTrigger disabled={logo === ""}>
                    <Avatar className="mx-auto h-16 w-16">
                      <AvatarImage
                        alt="Logga"
                        className="object-contain object-center"
                        src={logo}
                      />
                    </Avatar>
                    <Separator className="mx-auto w-4/5 bg-zLightGray" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{name}</DialogTitle>
                    <Avatar className="mx-auto h-auto w-full">
                      <AvatarImage
                        alt="Logga"
                        className="object-contain object-center"
                        src={logo}
                      />
                    </Avatar>
                  </DialogContent>
                </Dialog>
              )}
              <p className="text-center italic">{name}s medlemmar</p>
              <OldCommitteeCardMembers members={members} />
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
