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
    <div className="flex justify-center">
      <div className="h-full w-64 rounded-lg border">
        <div className="space-y-4 px-2 py-4">
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
                  className="object-contain"
                  filename={image ? image : logo ? logo : ""}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className=" border-none" value="members">
              <AccordionTrigger rotatedChevron={true}>
                <div className="ml-2 font-medium">{name}</div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
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
    </div>
  );
};

export default OldCommitteeCard;
