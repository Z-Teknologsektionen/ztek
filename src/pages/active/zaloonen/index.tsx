import type { NextPage } from "next";
import type { FC } from "react";
import { MdGridOn, MdList } from "react-icons/md";
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
      <div className="grid grid-cols-3">
        <div className="col-span-1 grid grid-cols-4">
          <TypeButton name="Alla" />
          <TypeButton name="Nya" />
          <TypeButton name="Godkända" />
          <TypeButton name="Nekade" />
        </div>
        <div className="col-span-1"> </div>
        <div className="col-span-1 grid grid-cols-2">
          <Button className="col-span-1 mx-2" variant="outline">
            <MdList size={25}></MdList>
          </Button>
          <Button className="col-span-1 mx-2" variant="outline">
            <MdGridOn size={25}></MdGridOn>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

//Kunna se i en lista
//Kunna se i ett schema
//Alert om man försöker boka in en tid på en tid som redan är upptagen

const TypeButton: FC<TypeButtonProps> = ({ name }) => (
  //Controls height for the cards, change h-XX to accomodate more text
  <Button className="col-span-1 mx-2" variant="outline">
    {name}
  </Button>
);

export default ZaloonenAdminPage;
