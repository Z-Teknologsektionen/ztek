import { AccountRoles } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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

interface MemberRolesActionsProps {
  currentRoles?: AccountRoles[];
  userId: string;
}

export const MemberRolesActions = ({
  userId,
  currentRoles = [],
}: MemberRolesActionsProps): ReactNode => {
  const [selectedValues, setSelectedValues] =
    useState<AccountRoles[]>(currentRoles);

  const valuesHasChanged = useMemo(
    () =>
      currentRoles.length !== selectedValues.length ||
      selectedValues
        .map((value) => currentRoles.includes(value))
        .includes(false),
    [currentRoles, selectedValues],
  );

  const ctx = api.useUtils();

  const { mutate: updateUser, isLoading: updatingUser } =
    api.user.updateUserRolesAsAdmin.useMutation({
      onMutate: () => toast.loading("Uppdaterar behörigheter..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ roles }) => {
        toast.success(`Följade behörigheter har satts: ${roles.join(", ")}`);
        void ctx.user.invalidate();
        void ctx.member.invalidate();
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
        <Badge
          className="grid place-items-center p-1 hover:cursor-pointer hover:bg-blue-50"
          variant="outline"
        >
          <PlusIcon className="h-3 w-3" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder={"Sök..."} />
          <CommandList>
            <CommandEmpty>Inga resultat hittades.</CommandEmpty>
            <CommandGroup>
              {Object.values(AccountRoles).map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                  <CommandItem
                    key={option}
                    className={cn(
                      updatingUser ? "cursor-not-allowed" : "cursor-pointer",
                    )}
                    disabled={updatingUser}
                    onSelect={() => {
                      setSelectedValues((prev) =>
                        prev.includes(option)
                          ? prev.filter((role) => role !== option)
                          : [...prev, option],
                      );
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
              {valuesHasChanged && (
                <div>
                  <Separator className="mx-2 my-2" orientation="horizontal" />
                  <div className="mx-auto my-2 flex items-center justify-center hover:bg-inherit">
                    <PopoverClose>
                      <Button
                        className="h-6"
                        onClick={() => {
                          updateUser({
                            id: userId,
                            roles: selectedValues,
                          });
                        }}
                        variant={"outline"}
                      >
                        Uppdatera
                      </Button>
                    </PopoverClose>
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
