import toast from "react-hot-toast";
import type { ZenithFormValuesType } from "~/components/active/zenith-media/zenith-media-table-actions";
import { handleCreateSftpFile } from "./api-calls";

export const handleCreateZenithMediaFile = (
  props: ZenithFormValuesType,
): void => {
  if (!(props.input.fileInput && props.input.fileInput[0])) {
    toast.error("No file input");
    new Error("No file input");
    return;
  }
  const filename =
    props.title.toLowerCase().replace(" ", "-") +
    "." +
    props.input.fileInput[0].name.split(".").pop();
  const toastId = toast.loading(
    `Laddar upp ${props.input.fileInput[0].name}.\n Detta kan ta en stund om du laddar upp stora filer...`,
  );
  handleCreateSftpFile({
    dir: "media",
    file: props.input.fileInput[0],
    isPublic: true,
    overwrite: false,
    filename,
  })
    .then((url) => {
      toast.dismiss(toastId);
      toast.success("Filuppladdningen lyckades");
      return url;
    })
    .catch((err: Error) => {
      toast.dismiss(toastId);
      toast.error(
        "Något gick fel vid uppladdningen av filen. \n" + err.message,
      );
    });
};
