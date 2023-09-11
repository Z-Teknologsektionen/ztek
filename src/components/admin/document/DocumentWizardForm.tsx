import type { FC, RefObject } from "react";
import { api } from "~/utils/api";

interface IDocumentWizardForm {
  groupIdRef: RefObject<HTMLSelectElement>;
  isPDFRef: RefObject<HTMLInputElement>;
  titleRef: RefObject<HTMLInputElement>;
  urlRef: RefObject<HTMLInputElement>;
}
export const DocumentWizardForm: FC<IDocumentWizardForm> = ({
  groupIdRef,
  isPDFRef,
  titleRef,
  urlRef,
}) => {
  const { data: documentGroups } = api.document.getAllGroupsAsAdmin.useQuery();
  return (
    <form className="mx-auto my-8 flex max-w-3xl flex-col gap-2">
      <select
        ref={groupIdRef}
        className="rounded border-2 p-1 shadow"
        defaultValue={""}
      >
        <option value="" disabled>
          Välj dokumenttyp
        </option>
        {documentGroups?.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <input
        ref={titleRef}
        className="rounded border-2 p-1 shadow"
        placeholder="Titel"
        type="text"
      />
      <input
        ref={urlRef}
        className="rounded border-2 p-1 shadow"
        placeholder="URL"
        type="text"
      />
      <div className="flex flex-row items-center justify-start gap-2">
        <label className="block" htmlFor="isPDF">
          PDF?
        </label>
        <input
          ref={isPDFRef}
          className="block h-full rounded border-2 p-1 shadow"
          id="isPDF"
          placeholder="PDF?"
          type="checkbox"
        />
      </div>
    </form>
  );
};
