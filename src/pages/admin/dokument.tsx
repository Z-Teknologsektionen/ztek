import type { NextPage } from "next";
import Link from "next/link";
import AdminWrapper from "~/components/layout/AdminWrapper";
import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const AdminDocumentPage: NextPage = () => {
  const { data: documents } = api.document.getAllAsAdmin.useQuery();
  const { data: documentGroups } = api.document.getAllGroupsAsAdmin.useQuery();
  return (
    <AdminWrapper>
      <Header />
      <SectionWrapper>
        <SectionTitle center>Redigera dokument</SectionTitle>
        <div className="overflow-auto">
          <table className="w-full border border-zLightGray text-lg">
            <thead className="bg-zDarkGray text-xl font-bold">
              <tr>
                <td className="p-1">Titel</td>
                <td className="p-1">Kategori</td>
                <td className="p-1">URL</td>
                <td className="p-1">PDF?</td>

                <td className="p-1"></td>
              </tr>
            </thead>
            <tbody>
              {documents?.map(({ id, isPDF, title, url, group: { name } }) => {
                const href = isPDF
                  ? `https://docs.google.com/viewer?url=${url}`
                  : url;
                return (
                  <tr key={url} className="odd:bg-zLightGray even:bg-zWhite">
                    <td className="p-1">{title}</td>
                    <td className="p-1">{name}</td>
                    <td className="p-1">{url}</td>
                    <td className="p-1">{isPDF ? "Ja" : "Nej"}</td>
                    <td className="flex flex-row justify-end gap-2 p-1">
                      <Link
                        className="block rounded border border-zBlack bg-green-500 px-3 py-1"
                        href={href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Visa
                      </Link>
                      <button
                        className="block rounded border border-zBlack bg-yellow-500 px-3 py-1"
                        onClick={() => {}}
                        type="button"
                      >
                        Redigera
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle center>Redigera dokument grupper</SectionTitle>
        <div className="overflow-auto">
          <table className="w-full overflow-x-auto overflow-y-hidden border border-zLightGray text-lg">
            <thead className="bg-zDarkGray text-xl font-bold">
              <tr>
                <td className="p-1">Name</td>
                <td className="p-1">Antal dokument</td>
                <td className="p-1">Extra JSON</td>

                <td className="p-1"></td>
              </tr>
            </thead>
            <tbody>
              {documentGroups?.map(
                ({
                  extraTextJson,
                  name,
                  _count: { Document: numberOfDocuments },
                }) => (
                  <tr key={name} className="odd:bg-zLightGray even:bg-zWhite">
                    <td className="p-1">{name}</td>
                    <td className="p-1">{numberOfDocuments}</td>
                    <td className="p-1">
                      {extraTextJson !== "" ? extraTextJson : "Ingen"}
                    </td>
                    <td className="flex flex-row justify-end gap-2 p-1">
                      <button
                        className="block rounded border border-zBlack bg-yellow-500 px-3 py-1"
                        onClick={() => {}}
                        type="button"
                      >
                        Redigera
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
      <Footer />
    </AdminWrapper>
  );
};

export default AdminDocumentPage;
