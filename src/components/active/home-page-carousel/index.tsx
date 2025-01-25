import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { homePageCarouselColumns } from "./home-page-carousel-columns";
import { HomePageCarouselTableToolbar } from "./home-page-carousel-table-toolbar";

const HomePageCarouselTab: FC = () => {
  const {
    data: caruselItems,
    isError: isErrorCaruselItems,
    isLoading: isLoadingCaruselItems,
  } = api.homePageCarousel.getManyByCommitteeIdAsActive.useQuery();

  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={homePageCarouselColumns}
          data={caruselItems || []}
          error={isErrorCaruselItems}
          loading={isLoadingCaruselItems}
          toolbar={HomePageCarouselTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default HomePageCarouselTab;
