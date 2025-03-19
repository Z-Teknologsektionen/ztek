export const getBase64FromFile = (
  file: File,
  options: { minHeight: number; minWidth: number },
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = () => {
      return reject();
    };
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return reject();
      }

      const imageElement = new Image();
      imageElement.src = reader.result;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } =
          (e.currentTarget as {
            naturalHeight: number;
            naturalWidth: number;
          } | null) || {};

        if (
          naturalWidth === undefined ||
          naturalHeight === undefined ||
          naturalWidth < options.minWidth ||
          naturalHeight < options.minHeight
        ) {
          return reject(
            `Filen är inte tilläckligt stor. Den behöver vara minst ${options.minWidth}x${options.minHeight}`,
          );
        }

        return resolve(reader.result as string);
      });
    };
  });
