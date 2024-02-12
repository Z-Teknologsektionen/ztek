import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { homeMediaColumns } from "./home-media-columns";
import { HomeMediaTableToolbar } from "./home-media-table-toolbar";

const HomeMediaTab: FC = () => {
  const {
    data: homeMedia,
    isLoading: isLoadingHomeMedia,
    isError: isHomeMediaError,
  } = api.HomeMedia.getAllAsAuthorized.useQuery();

  return (
    <RoleWrapper accountRole="ADMIN">
      <SectionWrapper>
        <AdvancedDataTable
          columns={homeMediaColumns}
          data={homeMedia ?? []}
          error={isHomeMediaError}
          loading={isLoadingHomeMedia}
          toolbar={HomeMediaTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default HomeMediaTab;
