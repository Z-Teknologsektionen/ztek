import { AccountRoles } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";
import AdminCommitteesTab from "~/components/active/committees";
import EditDocumentsTab from "~/components/active/documents";
import EditCommitteeTab from "~/components/active/edit-committee";
import ActiveStartTab from "~/components/active/home";
import AdminMembersTab from "~/components/active/members";
import ProgramBoardTab from "~/components/active/program-board";
import ZenithMediaTab from "~/components/active/zenith-media";

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
    component: ActiveStartTab,
    requiredRole: undefined,
    initialTab: true,
  },
  {
    name: "Administera organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    component: EditCommitteeTab,
  },
  {
    name: "Administera dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    component: EditDocumentsTab,
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
  },
  {
    name: "Administrera medlemmar",
    desc: "Lägg till eller ta bort medlemmar i olika organ.",
    component: AdminMembersTab,
    requiredRole: AccountRoles.ADMIN,
  },
  {
    name: "Administrera organ",
    desc: "Lägg till eller ta bort organ.",
    component: AdminCommitteesTab,
    requiredRole: AccountRoles.ADMIN,
  },
  {
    name: "Administrera programledningen",
    desc: "Lägg till, ta bort eller uppdatera någon i programledningen.",
    component: ProgramBoardTab,
    requiredRole: AccountRoles.MODIFY_PROGRAM_BOARD,
  },
  {
    name: "Administera Zeniths media",
    desc: "Här kan du ta bort eller lägga till Zeniths media som tidningar osv.",
    component: ZenithMediaTab,
    requiredRole: AccountRoles.MODIFY_ZENITH_MEDIA,
  },
];

export const activeTabs = [...rawActiveTabs] as const;
