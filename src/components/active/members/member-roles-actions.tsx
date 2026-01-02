import { AccountRoles } from "@prisma/client";
import { CheckIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import BadgeCell from "~/components/columns/badge-cell";
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
import { useUpdateUserAsAuthed } from "~/hooks/mutations/useMutateUserAsAuthed";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";
import { cn } from "~/utils/utils";

type MemberRolesActionsProps = {
  currentRoles?: AccountRoles[];
  userId: string;
};

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

  const { mutate: updateUser, isPending: updatingUser } = useUpdateUserAsAuthed(
    {},
  );

  const { data: session } = useRequireAuth();

  const userCanEdit = canCurrentUserModifyTargetRoleUser(
    session?.user.roles,
    currentRoles,
  );

  return (
    <Popover>
      <PopoverTrigger className="group" disabled={!userCanEdit || updatingUser}>
        <BadgeCell className="p-1 hover:cursor-pointer hover:bg-blue-50 group-disabled:cursor-not-allowed group-disabled:opacity-50">
          <PlusIcon className="h-3 w-3" />
        </BadgeCell>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder={"Sök..."} />
          <CommandList>
            <CommandEmpty>Inga resultat hittades.</CommandEmpty>
            <CommandGroup>
              {Object.values(AccountRoles).map((selectedRole) => {
                const canEdit = canCurrentUserModifyTargetRoleUser(
                  session?.user.roles,
                  [selectedRole],
                );

                const isSelected = selectedValues.includes(selectedRole);

                return (
                  <CommandItem
                    key={selectedRole}
                    disabled={updatingUser}
                    onSelect={() => {
                      if (!canEdit) return;

                      setSelectedValues((prev) =>
                        prev.includes(selectedRole)
                          ? prev.filter((role) => role !== selectedRole)
                          : [...prev, selectedRole],
                      );
                    }}
                  >
                    {canEdit ? (
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
                    ) : (
                      <LockClosedIcon className="mr-2 h-4 w-4" />
                    )}
                    {<span>{selectedRole}</span>}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
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
        </Command>
      </PopoverContent>
    </Popover>
  );
};
