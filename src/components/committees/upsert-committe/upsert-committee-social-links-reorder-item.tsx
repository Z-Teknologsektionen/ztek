import type { DragHandlers } from "framer-motion";
import { Reorder, useDragControls } from "framer-motion";
import { type FC } from "react";
import type {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowsAltV } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldSelectCommitteeSocialIcon from "~/components/forms/form-field-select-committee-social-icon";
import type { SocialLinksObject } from "./upsert-committee-social-links-section";

const UpsertCommitteeSocialLinksReorderItem: FC<{
  form: UseFormReturn<SocialLinksObject>;
  idx: number;
  onDragStart: DragHandlers["onDragStart"];
  removeSocialIcon: UseFieldArrayRemove;
  socialLink: FieldArrayWithId<SocialLinksObject, "socialLinks", "id">;
}> = ({ socialLink, form, removeSocialIcon, idx, onDragStart }) => {
  /*
   * Issue relaterad till att texten ibland (oklart när) markeras när man drar.
   * Detta är dock enbart i dev pga ReactStrict mode
   * https://github.com/framer/motion/issues/1518
   */
  const control = useDragControls();

  return (
    <Reorder.Item
      key={socialLink.id}
      as="li"
      className="flex flex-row items-center justify-between gap-4 rounded border bg-cardBackground p-3 shadow"
      drag="y"
      dragControls={control}
      // dragListener={false}
      id={socialLink.id}
      onDragStart={onDragStart}
      value={socialLink}
    >
      <div className="grid w-full grid-cols-5 gap-2">
        <div className="col-span-2">
          <FormFieldSelectCommitteeSocialIcon
            form={form}
            label=""
            name={`socialLinks.${idx}.iconVariant`}
          />
        </div>
        <div className="col-span-3">
          <FormFieldInput
            form={form}
            label=""
            name={`socialLinks.${idx}.url`}
            placeholder="Fyll i länk"
            type="text"
          />
        </div>
        <div className="col-span-full">
          <FormFieldInput
            form={form}
            label=""
            name={`socialLinks.${idx}.linkText`}
            placeholder="Fyll i länk text (kan lämnas tom)"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <FaTrash
          className="cursor-pointer hover:fill-zRed"
          onClick={() => {
            if (socialLink.iconVariant === "MAIL") {
              return toast.error(
                "Organet måste ha kvar sin mail länk, du kan enbart ändra ordning på denna",
              );
            }
            removeSocialIcon(idx);
          }}
          size={15}
        />
        <FaArrowsAltV
          className="cursor-grab hover:cursor-grabbing hover:fill-zLightGray"
          onPointerDown={(e) => control.start(e)}
          size={18}
        />
      </div>
    </Reorder.Item>
  );
};

export default UpsertCommitteeSocialLinksReorderItem;
