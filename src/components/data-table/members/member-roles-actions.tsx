import { AccountRoles } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";
import { cn } from "~/utils/utils";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

interface MemberRolesActionsProps {
  currentRoles: AccountRoles[] | undefined;
  userId: string;
}

export const MemberRolesActions = ({
  userId,
  currentRoles,
}: MemberRolesActionsProps): JSX.Element => {
  const initalValues = new Set(currentRoles);
  const [selectedValues, setSelectedValues] = useState(new Set(currentRoles));

  const ctx = api.useUtils();

  const { mutate: updateUser, isLoading: updatingUser } =
    api.user.updateUserRolesAsAdmin.useMutation({
      onMutate: () => toast.loading("Uppdaterar behörigheter..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ roles }) => {
        toast.success(`Följade behörigheter har satts: ${roles.join(", ")}`);
        void ctx.user.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  return (
    <Popover>
      <PopoverTrigger>
        {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
        <Badge
          className="hover:cursor-pointer hover:bg-blue-50"
          variant="outline"
        >
          +
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={"Sök..."} />
          <CommandList>
            <CommandEmpty>Inga resultat hittades.</CommandEmpty>
            <CommandGroup>
              {Object.values(AccountRoles).map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <CommandItem
                    key={option}
                    className={cn(
                      updatingUser ? "cursor-not-allowed" : "cursor-pointer",
                    )}
                    disabled={updatingUser}
                    onSelect={() => {
                      const newSelectedValues = new Set(selectedValues);
                      if (newSelectedValues.has(option)) {
                        newSelectedValues.delete(option);
                      } else {
                        newSelectedValues.add(option);
                      }
                      setSelectedValues(newSelectedValues);
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {<span>{option}</span>}
                  </CommandItem>
                );
              })}
              {initalValues.size !== selectedValues.size && [
                  initalValues.forEach((v) => !selectedValues.has(v)),
                ] && (
                  <div>
                    <Separator className="mx-2 my-2" orientation="horizontal" />
                    <div className="mx-auto my-2 flex items-center justify-center hover:bg-inherit">
                      <Button
                        className="h-6"
                        onClick={() => {
                          updateUser({
                            id: userId,
                            roles: Array.from(selectedValues),
                          });
                        }}
                        variant={"outline"}
                      >
                        Uppdatera
                      </Button>
                    </div>
                  </div>
                )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
