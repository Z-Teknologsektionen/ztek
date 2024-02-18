import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { zenithMediaColumns } from "./zenith-media-columns";
import { ZenithMediaTableToolbar } from "./zenith-media-table-toolbar";

const ZenithMediaTab: FC = () => {
  const {
    data: zenithMedia,
    isLoading: isLoadingZenithMedia,
    isError: isZenithMediaError,
  } = api.zenithMedia.getAllAsAuthed.useQuery();

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
