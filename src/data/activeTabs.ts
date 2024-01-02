import { AccountRoles } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";
import AdminCommitteePage from "~/components/active/committees";
import EditDocumentsPage from "~/components/active/documents";
import EditCommitteePage from "~/components/active/edit-committee";
import ActiveHomePage from "~/components/active/home";
import AdminMemberPage from "~/components/active/members";
import AdminProgramBoardPage from "~/components/active/program-board";

export interface ActiveTabsProps {
  component: FC<PropsWithChildren>;
  desc: string;
  initialTab?: boolean;
  name: string;
  requiredRole?: AccountRoles;
}

const rawActiveTabs: ActiveTabsProps[] = [
  {
    name: "Start",
    desc: "",
    component: ActiveHomePage,
    requiredRole: undefined,
    initialTab: true,
  },
  {
    name: "Administera organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    component: EditCommitteePage,
  },
  {
    name: "Administera dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    component: EditDocumentsPage,
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
  },
  {
    name: "Administrera medlemmar",
    desc: "Lägg till eller ta bort medlemmar i olika organ.",
    component: AdminMemberPage,
    requiredRole: AccountRoles.ADMIN,
  },
  {
    name: "Administrera organ",
    desc: "Lägg till eller ta bort organ.",
    component: AdminCommitteePage,
    requiredRole: AccountRoles.ADMIN,
  },
  {
    name: "Administrera programledningen",
    desc: "Lägg till, ta bort eller uppdatera någon i programledningen.",
    component: AdminProgramBoardPage,
    requiredRole: AccountRoles.ADMIN,
  },
];

export const activeTabs = [...rawActiveTabs] as const;
