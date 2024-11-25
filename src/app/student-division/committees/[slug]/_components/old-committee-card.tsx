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
          <CommitteeImage
            alt={
              image ? `Gruppbild på medlemmarna i ${name}` : `Logga på ${name}`
            }
            className="object-contain"
            filename={image || logo}
          />
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
                <>
                  <Avatar className="mx-auto h-16 w-16">
                    <AvatarImage
                      alt="Logga"
                      className="object-contain object-center"
                      src={logo}
                    />
                  </Avatar>
                  <Separator className="mx-auto w-4/5 bg-zLightGray" />
                </>
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
