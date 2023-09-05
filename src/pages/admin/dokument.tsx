import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CreateNewDocumentGroupWizard } from "~/components/admin/document/CreateNewDocumentGroupWizard";
import { CreateNewDocumentWizard } from "~/components/admin/document/CreateNewDocumentWizard";
import { DeleteDocumentGroupWizard } from "~/components/admin/document/DeleteDocumentGroupWizard";
import { DeleteDocumentWizard } from "~/components/admin/document/DeleteDocumentWizard";
import { UpdateDocumentGroupWizard } from "~/components/admin/document/UpdateDocumentGroupWizard";
import { UpdateDocumentWizard } from "~/components/admin/document/UpdateDocumentWizard";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const AdminDocumentPage: NextPage = () => {
  const { data: documents } = api.document.getAllAsAdmin.useQuery();
  const { data: documentGroups } = api.document.getAllGroupsAsAdmin.useQuery();

  const [showCreateDocumentWizard, setShowCreateDocumentWizard] =
    useState(false);
  const [editDocumentId, setEditDocumentId] = useState("");
  const [deleteDocumentId, setDeleteDocumentId] = useState("");

  const [showCreateDocumentGroupWizard, setShowCreateDocumentGroupWizard] =
    useState(false);
  const [editDocumentGroupId, setEditDocumentGroupId] = useState("");
  const [deleteDocumentGroupId, setDeleteDocumentGroupId] = useState("");

  return (
    <AdminWrapper>
      <SectionWrapper>
        <SectionTitle center>Redigera dokument</SectionTitle>
        <div className="flex justify-end">
          <button
            className="rounded border-2 bg-green-500 px-4 py-2 shadow"
            onClick={() => setShowCreateDocumentWizard(true)}
            type="button"
          >
            Skapa nytt
          </button>
        </div>
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
                        onClick={() => {
                          toast.loading("Hämtar dokument information...", {
                            id: "gettingCommitteeData",
                          });
                          setEditDocumentId(id);
                        }}
                        type="button"
                      >
                        Redigera
                      </button>
                      <button
                        className="block rounded border border-zBlack bg-red-500 px-3 py-1"
                        onClick={() => setDeleteDocumentId(id)}
                        type="button"
                      >
                        Radera
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
        <div className="flex justify-end">
          <button
            className="rounded border-2 bg-green-500 px-4 py-2 shadow"
            onClick={() => setShowCreateDocumentGroupWizard(true)}
            type="button"
          >
            Skapa nytt
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full overflow-x-auto overflow-y-hidden border border-zLightGray text-lg">
            <thead className="bg-zDarkGray text-xl font-bold">
              <tr>
                <td className="p-1">Name</td>
                <td className="p-1">Antal dokument</td>
                <td className="p-1">Extra Text</td>

                <td className="p-1"></td>
              </tr>
            </thead>
            <tbody>
              {documentGroups?.map(
                ({
                  id,
                  extraText,
                  name,
                  _count: { Document: numberOfDocuments },
                }) => (
                  <tr key={name} className="odd:bg-zLightGray even:bg-zWhite">
                    <td className="p-1">{name}</td>
                    <td className="p-1">{numberOfDocuments}</td>
                    <td className="p-1">
                      {extraText !== "" ? extraText : "Ingen"}
                    </td>
                    <td className="flex flex-row justify-end gap-2 p-1">
                      <button
                        className="block rounded border border-zBlack bg-yellow-500 px-3 py-1"
                        onClick={() => {
                          toast.loading("Hämtar nuvarande information...", {
                            id: "gettingGroupData",
                          });
                          setEditDocumentGroupId(id);
                        }}
                        type="button"
                      >
                        Redigera
                      </button>
                      {numberOfDocuments === 0 && (
                        <button
                          className="block rounded border border-zBlack bg-red-500 px-3 py-1"
                          onClick={() => setDeleteDocumentGroupId(id)}
                          type="button"
                        >
                          Radera
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
      <CreateNewDocumentWizard
        isOpen={showCreateDocumentWizard}
        onClose={() => setShowCreateDocumentWizard(false)}
      />
      <UpdateDocumentWizard
        id={editDocumentId}
        isOpen={editDocumentId !== ""}
        onClose={() => setEditDocumentId("")}
      />
      <DeleteDocumentWizard
        id={deleteDocumentId}
        isOpen={deleteDocumentId !== ""}
        onClose={() => setDeleteDocumentId("")}
      />
      <CreateNewDocumentGroupWizard
        isOpen={showCreateDocumentGroupWizard}
        onClose={() => setShowCreateDocumentGroupWizard(false)}
      />
      <UpdateDocumentGroupWizard
        id={editDocumentGroupId}
        isOpen={editDocumentGroupId !== ""}
        onClose={() => setEditDocumentGroupId("")}
      />
      <DeleteDocumentGroupWizard
        id={deleteDocumentGroupId}
        isOpen={deleteDocumentGroupId !== ""}
        onClose={() => setDeleteDocumentGroupId("")}
      />
    </AdminWrapper>
  );
};

export default AdminDocumentPage;
