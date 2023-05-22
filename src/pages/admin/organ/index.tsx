import { type NextPage } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { CreateNewOrganWizard } from "../../../components/admin/organ/CreateNewOrganWizard";
import { DeleteOraganWizard } from "../../../components/admin/organ/DeleteOraganWizard";
import { UpdateOrganWizard } from "../../../components/admin/organ/UpdateOrganWizard";

const AdminOrganPage: NextPage = () => {
  const { data: albumsAsAdmin } = api.committee.getAllAsAdmin.useQuery();

  const [showCreateNewModalPopup, setShowCreateNewModalPopup] = useState(false);
  const [editOrganSlug, setEditOrganSlug] = useState("");
  const [deleteOrganId, setDeleteOrganId] = useState("");

  return (
    <AdminWrapper>
      <SectionWrapper>
        <div className="flex justify-end">
          <button
            className="rounded border-2 bg-green-500 px-4 py-2 shadow"
            onClick={() => setShowCreateNewModalPopup(true)}
            type="button"
          >
            Lägg till nytt organ
          </button>
        </div>
        <table className="w-full overflow-x-auto overflow-y-hidden border border-zLightGray text-lg">
          <thead className="bg-zDarkGray text-xl font-bold">
            <tr>
              <td className="p-2">Namn</td>
              <td className="p-2">Ordning</td>
              <td className="p-2">Antal</td>

              <td className="p-2"></td>
            </tr>
          </thead>
          <tbody>
            {albumsAsAdmin?.map(({ id, name, order, _count, slug }) => (
              <tr key={id} className="odd:bg-zLightGray even:bg-zWhite">
                <td className="p-2 font-semibold">{name}</td>
                <td className="p-2">{order || 0}</td>
                <td className="p-2">{_count.members}</td>

                <td className="flex justify-end gap-2 p-2">
                  <button
                    className="block w-fit rounded border bg-yellow-500 px-3 py-1 text-base font-light shadow"
                    onClick={() => {
                      toast.loading("Laddar kommitté information", {
                        id: "gettingCommitteeData",
                      });
                      setEditOrganSlug(slug);
                    }}
                    type="button"
                  >
                    Redigera
                  </button>
                  {_count.members === 0 && (
                    <button
                      className="block w-fit rounded border bg-red-500 px-3 py-1 text-base font-light shadow"
                      onClick={() => {
                        setDeleteOrganId(id);
                      }}
                      type="button"
                    >
                      Radera
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionWrapper>
      <CreateNewOrganWizard
        close={() => setShowCreateNewModalPopup(false)}
        isOpen={showCreateNewModalPopup}
      />
      <UpdateOrganWizard
        close={() => setEditOrganSlug("")}
        isOpen={editOrganSlug !== ""}
        slug={editOrganSlug}
      />
      <DeleteOraganWizard
        close={() => setDeleteOrganId("")}
        id={deleteOrganId}
        isOpen={deleteOrganId !== ""}
      />
    </AdminWrapper>
  );
};

export default AdminOrganPage;
