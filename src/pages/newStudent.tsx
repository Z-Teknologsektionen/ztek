import type { NextPage } from "next";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const NewStudent: NextPage = () => {
  return (
    <>
      <HeadLayout title="Ny Student" />
      <SectionWrapper>
        <div className="text-center">
          <SectionTitle className="pb-4">Ny på Z</SectionTitle>
          <p className="">Hej</p>
        </div>
      </SectionWrapper>
    </>
  );
};

export default NewStudent;
