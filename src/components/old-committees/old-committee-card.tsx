import type { FC } from "react";
import { useState } from "react";
import type { RouterOutputs } from "~/utils/api";
import CommitteeImage from "../committees/CommitteeImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const OldCommitteeCard: FC<
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0]
> = ({ name, image, logo, members }) => {
  const [activeAccordion, setActiveAccordion] = useState("image");

  return (
    <div className="flex h-full max-w-xs justify-center rounded-lg border px-2 py-4">
      <div className="space-y-4">
        <Accordion
          onValueChange={(value) =>
            value ? setActiveAccordion(value) : setActiveAccordion("image")
          }
          type="single"
          value={activeAccordion}
          collapsible
        >
          <AccordionItem className="border-none" value="image">
            <AccordionContent>
              <CommitteeImage
                alt={`Gruppbild på ${name}`}
                filename={image ? image : logo ? logo : ""}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-none" value="members">
            <AccordionTrigger rotatedChevron={true}>
              <div className="ml-2 font-medium">{name}</div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-64">
                {logo && (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <Avatar className="h-fit w-1/3">
                        <AvatarImage alt="Logga på" src={logo} />
                      </Avatar>
                      <p className="mt-2 text-center italic">
                        {name}&apos;s logga
                      </p>
                    </div>
                    <Separator className="mx-auto my-4 w-4/5 bg-zLightGray" />
                  </>
                )}
                <div className="flex flex-wrap">
                  {members
                    .sort((a, b) => b.order - a.order)
                    .map((member, index) => (
                      <div
                        key={index}
                        className="mx-2 my-1 rounded-md border p-2"
                      >
                        {member.nickName ? (
                          <>
                            <h3 className="text-sm font-medium leading-none">
                              {member.nickName}
                            </h3>
                            <p className="text-xs leading-none">
                              {member.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-sm font-medium leading-none">
                              {member.name}
                            </h3>
                          </>
                        )}
                        <p className="text-xs italic leading-none">
                          {member.role ? member.role : "Ledamot"}
                        </p>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default OldCommitteeCard;
