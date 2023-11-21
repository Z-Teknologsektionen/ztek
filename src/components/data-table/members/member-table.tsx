import type { FC } from "react";
import { useState } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";
import { columns } from "./columns";

const MemberTable: FC = () => {
  const { replaceQuery } = useRouterHelpers();
  const [committeeFilter, setCommitteeFilter] = useState<string | undefined>(
    undefined,
  );

  const {
    data: committees,
    isLoading,
    isError,
  } = api.committee.getAllAsAdmin.useQuery();

  const { data: membersAsAdmin } =
    api.member.getCommitteeMembersAsAdmin.useQuery({
      committeeId: committeeFilter,
    });
  return (
    <>
      <div>
        <SectionTitle center>Medlemmar</SectionTitle>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="filterByOrganSelect">Filtera på organ</label>
            <select
              className="rounded border border-zBlack px-3 py-1"
              defaultValue={""}
              id="filterByOrganSelect"
              onChange={(e) =>
                setCommitteeFilter(
                  e.target.value !== "" ? e.target.value : undefined,
                )
              }
            >
              <option value="">Alla</option>
              {committees?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <Button
              onClick={() => void replaceQuery("newMember", "true")}
              size="lg"
              type="button"
              variant="outline"
            >
              Ny medlem
            </Button>
          </div>
        </div>
      </div>

      {isLoading && "Hämtar medlemmar..."}
      {isError && "Okänt fel"}
      {membersAsAdmin && (
        <BasicDataTable columns={columns} data={membersAsAdmin} />
      )}
    </>
  );
};

export default MemberTable;
