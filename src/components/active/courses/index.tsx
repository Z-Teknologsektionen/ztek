import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { coursesColumns } from "./courses-columns";
import { CoursesTableToolbar } from "./courses-table-toolbar";

const AdministerCoursesTab: FC = () => {
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isError: isCoursesError,
  } = api.course.getAllCoursesAsAuthed.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_COURSES}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={coursesColumns}
          data={courses || []}
          error={isLoadingCourses}
          loading={isCoursesError}
          toolbar={CoursesTableToolbar}
          usePagination={true}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdministerCoursesTab;
