import type { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CreateNewMemberWizard } from "~/components/admin/medlemmar/CreateNewMemberWizard";
import { DeleteMemberWizard } from "~/components/admin/medlemmar/DeleteMemberWizard";
import { UpdateMemberWizard } from "~/components/admin/medlemmar/UpdateMemberWizard";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const AdminMemberPage: NextPage = () => {
  const [committeeFilter, setCommitteeFilter] = useState<string | undefined>(
    undefined
  );

  const { data: committees } = api.committee.getAllAsAdmin.useQuery();

  const { data: membersAsAdmin } = api.member.getAllMembersAsAdmin.useQuery({
    committeeId: committeeFilter,
  });

  const [showCreateNewModalPopup, setShowCreateNewModalPopup] = useState(false);
  const [editMemberId, setEditMemberId] = useState("");
  const [deleteMemberId, setDeleteMemberId] = useState("");

  return (
    <AdminWrapper>
      <SectionWrapper>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="filterByOrganSelect">Filtera på organ</label>
            <select
              className="rounded border border-zBlack px-3 py-1"
              defaultValue={""}
              id="filterByOrganSelect"
              onChange={(e) =>
                setCommitteeFilter(
                  e.target.value !== "" ? e.target.value : undefined
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
          <button
            className="rounded border-2 bg-green-500 px-4 py-2 shadow"
            onClick={() => setShowCreateNewModalPopup(true)}
            type="button"
          >
            Lägg till ny medlem
          </button>
        </div>
        <table className="w-full overflow-x-auto overflow-y-hidden border border-zLightGray text-lg">
          <thead className="bg-zDarkGray text-xl font-bold">
            <tr>
              <td className="p-2">Email</td>
              <td className="p-2">Namn, kommitté namn</td>
              <td className="p-2">Ordning</td>

              <td className="p-2"></td>
            </tr>
          </thead>
          <tbody>
            {membersAsAdmin?.map(({ id, name, order, nickName, email }) => (
              <tr key={id} className="odd:bg-zLightGray even:bg-zWhite">
                <td className="p-2">{email}</td>
                <td className="p-2 font-semibold">{`${name}, ${nickName}`}</td>
                <td className="p-2">{order || 0}</td>

                <td className="flex justify-end gap-2 p-2">
                  <button
                    className="block w-fit rounded border bg-yellow-500 px-3 py-1 text-base font-light shadow"
                    onClick={() => {
                      toast.loading("Laddar medlem information", {
                        id: "gettingMemberData",
                      });
                      setEditMemberId(id);
                    }}
                    type="button"
                  >
                    Redigera
                  </button>

                  <button
                    className="block w-fit rounded border bg-red-500 px-3 py-1 text-base font-light shadow"
                    onClick={() => {
                      setDeleteMemberId(id);
                    }}
                    type="button"
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionWrapper>
      <CreateNewMemberWizard
        close={() => setShowCreateNewModalPopup(false)}
        isOpen={showCreateNewModalPopup}
      />
      <UpdateMemberWizard
        close={() => setEditMemberId("")}
        id={editMemberId}
        isOpen={editMemberId !== ""}
      />
      <DeleteMemberWizard
        close={() => setDeleteMemberId("")}
        id={deleteMemberId}
        isOpen={deleteMemberId !== ""}
      />
    </AdminWrapper>
  );
};

export default AdminMemberPage;
