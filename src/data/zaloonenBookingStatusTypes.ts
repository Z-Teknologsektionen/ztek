import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "NEW",
    label: "Ny",
    iconColor: "orange",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "APPROVED",
    label: "Godkänd",
    iconColor: "green",
    icon: CheckCircledIcon,
  },
  {
    value: "REJECTED",
    label: "Nekad",
    iconColor: "red",
    icon: CrossCircledIcon,
  },
];
