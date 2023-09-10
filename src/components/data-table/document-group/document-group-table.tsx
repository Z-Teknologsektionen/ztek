import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";
import { columns } from "./columns";

const DocuemntGroupTable: FC = () => {
  const { replaceQuery } = useRouterHelpers();

  const { data, isLoading, isError } =
    api.document.getAllGroupsAsAdmin.useQuery();

  return (
    <>
      <div>
        <SectionTitle center>Redigera dokument grupper</SectionTitle>
        <div className="flex justify-end">
          <Button
            onClick={() => void replaceQuery("newGroup", "true")}
            size="lg"
            type="button"
            variant="outline"
          >
            Skapa ny
          </Button>
        </div>
      </div>
      {isLoading && "Hämtar tabel..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default DocuemntGroupTable;
