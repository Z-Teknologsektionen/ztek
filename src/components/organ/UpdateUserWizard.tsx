import dayjs from "dayjs";
import {
  useCallback,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from "react";
import Resizer from "react-image-file-resizer";
import CommitteeImage from "~/components/organ/CommitteeImage";
import { api, type RouterOutputs } from "~/utils/api";

interface IUpdateUserWizard {
  member: RouterOutputs["committee"]["getOneByEmail"]["members"][0];
  refetch: () => void;
}
export const UpdateUserWizard: FC<IUpdateUserWizard> = ({
  member,
  refetch,
}) => {
  const { mutate: mutateMember } = api.member.updateOne.useMutation({
    onSettled: () => refetch(),
  });

  const [updatedMemberInfo, setUpdatedMemberInfo] = useState({
    name: member.name,
    nickName: member.nickName,
    image: member.image,
    order: member.order,
  });

  const updateMember = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { name, image, nickName, order } = updatedMemberInfo;
      mutateMember({
        id: member.id,
        image: image,
        name: name,
        nickName: nickName,
        order: order,
      });
    },
    [updatedMemberInfo, member.id, mutateMember]
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    Resizer.imageFileResizer(
      file,
      300,
      300,
      "WEBP",
      95,
      0,
      (uri) => {
        setUpdatedMemberInfo((prev) => {
          return {
            ...prev,
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            image: uri.toString(),
          };
        });
      },
      "base64",
      300,
      300
    );

    setTimeout(() => (e.target.value = ""), 2500);
  }, []);

  return (
    <form
      className="flex flex-col items-center space-y-2 rounded-lg p-4 text-sm shadow"
      onSubmit={updateMember}
    >
      <CommitteeImage
        alt={`Profilbild på ${member.role}`}
        filename={updatedMemberInfo.image}
      />
      <fieldset className="w-full space-y-1">
        <label className="block text-xs" htmlFor="name">
          Namn
        </label>
        <input
          className="w-full rounded border-2 p-0.5"
          id="name"
          name="name"
          onChange={(e) => {
            setUpdatedMemberInfo((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          type="text"
          value={updatedMemberInfo.name ?? ""}
        />
      </fieldset>
      <fieldset className="w-full space-y-1">
        <label className="block text-xs" htmlFor="nickName">
          Kommitenamn
        </label>
        <input
          className="w-full rounded border-2 p-0.5"
          id="nickName"
          name="nickName"
          onChange={(e) => {
            setUpdatedMemberInfo((prev) => {
              return { ...prev, nickName: e.target.value };
            });
          }}
          type="text"
          value={updatedMemberInfo.nickName ?? ""}
        />
      </fieldset>
      <fieldset className="w-full space-y-1">
        <label className="block text-xs" htmlFor="order">
          Ordning
        </label>
        <input
          className="w-full rounded border-2 p-0.5"
          id="order"
          max={99}
          min={0}
          name="order"
          onChange={(e) => {
            setUpdatedMemberInfo((prev) => {
              return { ...prev, order: e.target.valueAsNumber };
            });
          }}
          type="number"
          value={updatedMemberInfo.order ?? 0}
        />
      </fieldset>
      <fieldset className="w-full space-y-1">
        <label className="block text-xs" htmlFor="file">
          Välj profilbild
        </label>
        <input
          className="block w-48 text-sm"
          id="file"
          name="file"
          onChange={handleFileChange}
          type="file"
        />
        <input
          className="rounded border-2 bg-zLightGray p-0.5 text-sm"
          onClick={() => {
            setUpdatedMemberInfo((prev) => {
              return { ...prev, image: "" };
            });
          }}
          type="button"
          value="Radera profilbild"
        />
      </fieldset>
      <input
        className="w-full rounded border-2 p-1"
        type="submit"
        value="Spara"
      />
      <div className="w-full">
        <p className="text-xs">
          Senast updaterad: {dayjs(member.updatedAt).fromNow()}
        </p>
        <p className="text-xs">Roll: {member.role}</p>
        <p className="text-xs">Email: {member.email}</p>
      </div>
    </form>
  );
};
