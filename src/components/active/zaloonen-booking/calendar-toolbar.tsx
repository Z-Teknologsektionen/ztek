import { ZaloonenBookingStatus } from "@prisma/client";
import { CheckIcon, Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/utils/utils";

interface CalendarToolbarProps {
  label: string;
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
  selectedBookingStatuses: string[];
  setSelectedBookingStatuses: (value: ZaloonenBookingStatus[]) => void;
  view: string;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  onNavigate,
  onView,
  view,
  label,
  selectedBookingStatuses,
  setSelectedBookingStatuses,
}) => {
  return (
    <div className="mb-4 grid grid-cols-3">
      <div className="flex justify-start gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-8 border-dashed" size="sm" variant="outline">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Filtrera på status
              {selectedBookingStatuses.length > 0 && (
                <>
                  <Separator className="mx-2 h-4" orientation="vertical" />
                  <Badge
                    className="rounded-sm px-1 font-normal lg:hidden"
                    variant="secondary"
                  >
                    {selectedBookingStatuses.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedBookingStatuses.length > 2 ? (
                      <Badge
                        className="rounded-sm px-1 font-normal"
                        variant="secondary"
                      >
                        {selectedBookingStatuses.length} valda
                      </Badge>
                    ) : (
                      Object.values(ZaloonenBookingStatus)
                        .filter((option) =>
                          selectedBookingStatuses.includes(option),
                        )
                        .map((option) => (
                          <Badge
                            key={option}
                            className={`rounded-sm px-1 font-normal`}
                            // color={option.iconColor}
                            variant="secondary"
                          >
                            {option}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Command>
              <CommandInput placeholder={"Sök"} />
              <CommandList>
                <CommandEmpty>Inga resultat hittades.</CommandEmpty>
                <CommandGroup>
                  {Object.values(ZaloonenBookingStatus).map((option) => {
                    const isSelected = selectedBookingStatuses.includes(option);
                    return (
                      <CommandItem
                        key={option}
                        onSelect={() => {
                          if (isSelected) {
                            setSelectedBookingStatuses((prev) =>
                              prev.filter((s) => s !== option),
                            );
                          } else {
                            setSelectedBookingStatuses((prev) => [
                              ...prev,
                              option,
                            ]);
                          }
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
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>

                        <span>{option}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {selectedBookingStatuses.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        className="justify-center text-center"
                        onSelect={() => {
                          setSelectedBookingStatuses([]);
                        }}
                      >
                        Rensa filter
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedBookingStatuses.length > 0 && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => setSelectedBookingStatuses([])}
            variant="outline"
          >
            Återställ
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-center text-center text-lg">
        <MdArrowBack
          className="cursor-pointer"
          onClick={() => onNavigate("PREV")}
          size={20}
        />
        <p className="w-56 text-base font-medium capitalize  underline">
          {view === "month" && moment(label).format("MMMM").toUpperCase()}
          {view === "week" && label}
          {view === "day" && label}
        </p>
        <MdArrowForward
          className="cursor-pointer"
          onClick={() => onNavigate("NEXT")}
          size={20}
        />
      </div>
      <div className="flex h-6 justify-end p-2">
        <Button
          className={cn("mr-3 h-6", view === "day" ? "bg-slate-300" : "")}
          onClick={() => onNavigate("TODAY")}
          variant={"outline"}
        >
          Idag
        </Button>
        <Button
          className={cn(
            "h-6 rounded-l-md rounded-r-none",
            view === "day" ? "bg-slate-300" : "",
          )}
          onClick={() => onView("day")}
          variant={"outline"}
        >
          Dag
        </Button>
        <Button
          className={cn(
            "h-6 rounded-none",
            view === "week" ? "bg-slate-300" : "",
          )}
          onClick={() => onView("week")}
          variant={"outline"}
        >
          Vecka
        </Button>
        <Button
          className={cn(
            "h-6 rounded-l-none rounded-r-md",
            view === "month" ? "bg-slate-300" : "",
          )}
          onClick={() => onView("month")}
          variant={"outline"}
        >
          Månad
        </Button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
