import type { NextPage } from "next";
import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";

interface TypeButtonProps {
  name: string;
}

const ZaloonenAdminPage: NextPage = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Zaloonen</SectionTitle>
      <div className="grid grid-cols-10">
        <TypeButton name="Alla" />
        <TypeButton name="Nya" />
        <TypeButton name="Godkända" />
        <TypeButton name="Nekade" />
      </div>
    </SectionWrapper>
  );
};

const TypeButton: FC<TypeButtonProps> = ({ name }) => (
  //Controls height for the cards, change h-XX to accomodate more text
  <Button className="col-span-2 mx-2" variant="outline">
    {name}
  </Button>
);

export default ZaloonenAdminPage;
