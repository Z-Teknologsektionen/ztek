import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";
import { columns } from "./columns";

const ProgramBoardTable: FC = () => {
  const { replaceQuery } = useRouterHelpers();

  const { data, isLoading, isError } =
    api.programBoard.getAllAsAdmin.useQuery();

  return (
    <>
      <div>
        <SectionTitle center>Programledning</SectionTitle>
        <div className="flex justify-end">
          <Button
            onClick={() => void replaceQuery("newCommittee", "true")}
            size="lg"
            type="button"
            variant="outline"
          >
            Skapa ny person
          </Button>
        </div>
      </div>

      {isLoading && "Hämtar programledningens medlemmar..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default ProgramBoardTable;
