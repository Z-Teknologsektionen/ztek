import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";
import { columns } from "./columns";

const DocuemntTable: FC = () => {
  const { replaceQuery } = useRouterHelpers();

  const { data, isLoading, isError } = api.document.getAllAsAdmin.useQuery();

  return (
    <>
      <div>
        <SectionTitle center>Redigera dokument</SectionTitle>
        <div className="flex justify-end">
          <Button
            onClick={() => void replaceQuery("newDoc", "true")}
            size="lg"
            type="button"
            variant="outline"
          >
            Skapa nytt
          </Button>
        </div>
      </div>

      {isLoading && "Hämtar dokument..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default DocuemntTable;
