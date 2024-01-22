import type { FC } from "react";
import ZenithMediaTable from "~/components/data-table/zenith-media/zenith-media-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ZenithMediaTab: FC = () => {
  return (
    <RoleWrapper accountRole="MODIFY_ZENITH_MEDIA">
      <SectionWrapper>
        <ZenithMediaTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZenithMediaTab;
