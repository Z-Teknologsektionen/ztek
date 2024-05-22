import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import type { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import AdministerCommitteesTab from "~/components/active/committees";
import EditDocumentsTab from "~/components/active/documents";
import EditCommitteeTab from "~/components/active/edit-committee";
import ActiveStartTab from "~/components/active/home";
import AdministerMembersTab from "~/components/active/members";
import OldCommitteesTab from "~/components/active/old-committees";
import ProgramBoardTab from "~/components/active/program-board";
import ZenithMediaTab from "~/components/active/zenith-media";

export interface ActiveTabsProps {
  component: FC;
  desc?: string;
  icon?: IconType;
  initialTab?: boolean;
  instructions?: string[];
  name: string;
  requiredRole?: AccountRoles;
}

/*
 * Om du håller på att redigera rawActiveTabs kan du behöva ta bort as const nere vid activeTabs för att typescript ska kunna förstå att du håller på att uppdatera grejer
 * Exporteras som as const nedan då detta ska vara statisk data
 */
const rawActiveTabs: ActiveTabsProps[] = [
  {
    name: "",
    desc: "",
    component: ActiveStartTab,
    requiredRole: undefined,
    initialTab: true,
    icon: FaHome,
  },
  {
    name: "Mitt organ",
    desc: "Här kan du som precis gått på byta namn på sittande och byta logga!",
    component: EditCommitteeTab,
  },
  {
    name: "Pateter",
    desc: "Det är kul att få sitt namn förevigat på sektionen och här kan man göra det. Du kan lägga till gamla år med en bild, logga och medlemmar om du vill. Det finns ingen begränsning på hur många du kan lägga år du kan lägga till, ju fler desto bättre. Om du inte har lagt till några pateter kommer sidan inte visas alls.",
    component: OldCommitteesTab,
    requiredRole: undefined,
  },
  {
    name: "Dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    component: EditDocumentsTab,
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
  },
  {
    name: "Medlemmar",
    desc: "Här kan du lägga till, redigera eller ta bort medlemmar i olika organ.",
    component: AdministerMembersTab,
    requiredRole: AccountRoles.ORGANIZATION_MANAGEMENT,
  },
  {
    name: "Alla organ",
    desc: "Här kan du lägga till, redigera eller ta bort organ.",
    component: AdministerCommitteesTab,
    requiredRole: AccountRoles.ORGANIZATION_MANAGEMENT,
  },
  {
    name: "Programledningen",
    desc: "Här kan du lägga till, redigera eller ta bort någon i programledningen.",
    component: ProgramBoardTab,
    requiredRole: AccountRoles.MODIFY_PROGRAM_BOARD,
  },
  {
    name: "Zeniths media",
    desc: "Här kan du ta bort eller lägga till Zeniths media som tidningar osv.",
    component: ZenithMediaTab,
    requiredRole: AccountRoles.MODIFY_ZENITH_MEDIA,
  },
];

export const activeTabs = [...rawActiveTabs] as const;
