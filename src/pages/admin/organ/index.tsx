import { type NextPage } from "next";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const AdminOrganPage: NextPage = () => {
  const { data: albumsAsAdmin } = api.committee.getAllAsAdmin.useQuery();
  return (
    <AdminWrapper>
      <SectionWrapper>
        <div className="flex justify-end">
          <button>Lägg till nytt organ</button>
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
            {albumsAsAdmin?.map(({ id, name, order, _count }) => (
              <tr key={id} className="odd:bg-zLightGray even:bg-zWhite">
                <td className="p-2 font-semibold">{name}</td>
                <td className="p-2">{order || 0}</td>
                <td className="p-2">{_count.members}</td>

                <td className="p-2">
                  <button
                    className="ml-auto block rounded border bg-yellow-500 px-3 py-1 text-base font-light shadow"
                    type="button"
                  >
                    Redigera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionWrapper>
    </AdminWrapper>
  );
};

export default AdminOrganPage;
