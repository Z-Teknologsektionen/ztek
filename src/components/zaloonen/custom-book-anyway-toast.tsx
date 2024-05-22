import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";

export const customBookAnywayToast = ({
  message,
  onError,
  onSubmit,
}: {
  message: string;
  onError?: () => void;
  onSubmit: () => void;
}): string =>
  toast(
    (t) => (
      <div className="grid place-items-center gap-2 text-center">
        <p>{message}</p>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => {
              onError?.();
              toast.dismiss(t.id);
            }}
            size="sm"
            variant="outline"
          >
            Avbryt
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              toast.dismiss(t.id);
            }}
            size="sm"
            variant="destructive"
          >
            Boka ändå
          </Button>
        </div>
      </div>
    ),
    {
      duration: 10_000,
    },
  );
