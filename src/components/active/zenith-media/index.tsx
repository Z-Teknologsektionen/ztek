import type { FC } from "react";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../../data-table/advanced-data-table";
import { zenithMediaColumns } from "./zenith-media-columns";
import { ZenithMediaTableToolbar } from "./zenith-media-table-toolbar";

const ZenithMediaTab: FC = () => {
  const {
    data: zenithMedia,
    isLoading: isLoadingZenithMedia,
    isError: isZenithMediaError,
  } = api.zenithMedia.getAllAsAuthorized.useQuery();

  return (
    <RoleWrapper accountRole="MODIFY_ZENITH_MEDIA">
      <SectionWrapper>
        <AdvancedDataTable
          columns={zenithMediaColumns}
          data={zenithMedia ?? []}
          error={isZenithMediaError}
          loading={isLoadingZenithMedia}
          toolbar={ZenithMediaTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZenithMediaTab;
