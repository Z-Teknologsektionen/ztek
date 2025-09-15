import toast from "react-hot-toast";
import { env } from "~/env.mjs";
import { handleCreateSftpFile } from "~/utils/sftp/handle-create-sftp-file";
import { handleDeleteSftpFile } from "~/utils/sftp/handle-delete-sftp-file";

type ImageOperationResult<T> =
  | {
      data: T;
      success: boolean;
    }
  | {
      error: string;
      success: false;
    };

/**
 * Handles all image operations
 * - Uploads new images
 * - Removes existing images
 * - Processes image state changes
 */
export const imageOperations = {
  /**
   * Uploads a new image and optionally deletes the old one
   */
  uploadImage: async ({
    file,
    name,
    oldImageUrl = null,
    isPublic = true,
    overwrite = true,
  }: {
    file: File;
    isPublic?: boolean;
    name: string;
    oldImageUrl?: string | null;
    overwrite?: boolean;
  }): Promise<ImageOperationResult<string>> => {
    const loadingToastId = toast.loading(
      "Laddar upp bilden. Detta kan ta en stund!",
    );

    try {
      // Safely extract file extension
      const fileType = file.type.split("/");
      const extension = fileType.length > 1 ? fileType[1] : "png";

      //Create a new file with timestamp to invalidate nextjs cache
      const imageUrl = await handleCreateSftpFile({
        dir: "images",
        file,
        filename: `${name}-${file.lastModified}.${extension}`,
        isPublic,
        overwrite,
      });

      if (!imageUrl) {
        toast.error("Kunde inte ladda upp bilden. Försök igen senare.");
        return { success: false, error: "Failed to upload image" };
      }

      // If there was a previous image and it's different, delete the old one
      if (
        oldImageUrl &&
        oldImageUrl !== imageUrl &&
        oldImageUrl.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)
      ) {
        try {
          await handleDeleteSftpFile({ url: oldImageUrl });
        } catch (deleteError) {
          // Log but don't block the update if old image deletion fails
          console.error("Failed to delete old image:", deleteError);
        }
      }

      return { success: true, data: imageUrl };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Bilduppladdning misslyckades: ${error.message}`);
        return { success: false, error: error.message };
      } else {
        toast.error("Något gick fel vid bilduppladdning. Försök igen senare.");
        return { success: false, error: "Unknown error during upload" };
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  },

  /**
   * Removes an existing image from the server
   */
  removeImage: async ({
    imageUrl,
  }: {
    imageUrl: string;
  }): Promise<ImageOperationResult<boolean>> => {
    const loadingToastId = toast.loading(
      "Tar bort bilden. Detta kan ta en stund!",
    );

    try {
      await handleDeleteSftpFile({ url: imageUrl });
      return { success: true, data: true };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Borttagning av bild misslyckades: ${error.message}`);
        return { success: false, error: error.message };
      } else {
        toast.error(
          "Något gick fel vid borttagning av bild. Försök igen senare.",
        );
        return { success: false, error: "Unknown error during removal" };
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  },

  /**
   * Processes image state changes and returns the updated data
   * Handles three cases:
   * 1. New image being uploaded
   * 2. Existing image being removed
   * 3. No changes to image
   */
  processImageChanges: async ({
    newImageFile,
    currentImageUrl,
    oldImageUrl,
    entityName,
  }: {
    currentImageUrl: string;
    entityName: string;
    newImageFile?: File | null;
    oldImageUrl?: string;
  }): Promise<ImageOperationResult<string>> => {
    try {
      // Case 1: New image being uploaded
      if (newImageFile) {
        const result = await imageOperations.uploadImage({
          file: newImageFile,
          name: entityName,
          oldImageUrl: oldImageUrl,
        });

        if (!result.success) {
          return { success: false, error: "Image upload failed" };
        }

        return { success: true, data: result.data };
      }

      // Case 2: Image being removed
      else if (currentImageUrl === "" && oldImageUrl) {
        const result = await imageOperations.removeImage({
          imageUrl: oldImageUrl,
        });

        if (!result.success) {
          return { success: false, error: "Image removal failed" };
        }

        return { success: true, data: "" };
      }

      // Case 3: No image changes
      return { success: true, data: currentImageUrl };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Bildhantering misslyckades: ${error.message}`);
        return { success: false, error: error.message };
      } else {
        toast.error(`Något gick fel. Försök igen senare.`);
        return {
          success: false,
          error: "Unknown error during image processing",
        };
      }
    }
  },
};
