import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { homepageCarouselColumns } from "./homepage-carousel-columns";
import { HomepageCarouselTableToolbar } from "./homepage-carousel-table-toolbar";

const EditHomepageCarouselTab: FC = () => {
  const { data, isError, isLoading } =
    api.homepageCarousel.getAllAsAuthed.useQuery();

  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={homepageCarouselColumns}
          data={data || []}
          error={isError}
          loading={isLoading}
          toolbar={HomepageCarouselTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default EditHomepageCarouselTab;
