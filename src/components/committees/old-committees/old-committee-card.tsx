import type { FC } from "react";
import { useState } from "react";
import CommitteeImage from "~/components/committees/committee-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import type { RouterOutputs } from "~/utils/api";

const OldCommitteeCard: FC<
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0]
> = ({ name, image, logo, members }) => {
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
            alt={image ? "Gruppbild på medlemmarna" : "Logga"}
            className="object-contain"
            filename={image || logo || ""}
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
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OldCommitteeCard;
