import type { FC } from "react";
import { MdCancel, MdCheck } from "react-icons/md";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";

const BooleanCell: FC<{ value: boolean }> = ({ value }) => {
  return (
    <div className="mx-2">
      {value ? (
        <MdCheck className="fill-success" size={TABLE_ICON_SIZE} />
      ) : (
        <MdCancel className="fill-danger" size={TABLE_ICON_SIZE} />
      )}
    </div>
  );
};

export default BooleanCell;
