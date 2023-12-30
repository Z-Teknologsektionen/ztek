import { AccountRoles } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";
import AdminCommitteePage from "~/components/active/committees";
import EditDocumentsPage from "~/components/active/documents";
import EditCommitteePage from "~/components/active/edit-committee";
import ActiveHomePage from "~/components/active/home";
import AdminMemberPage from "~/components/active/members";
import AdminProgramBoardPage from "~/components/active/program-board";

export interface RouteProps {
  component: FC<PropsWithChildren>;
  desc: string;
  initialPage?: boolean;
  name: string;
  requiredRole: AccountRoles | undefined;
}
// export interface ActiveRouteProps extends AdminRouteProps {}

export const activeRoutes: RouteProps[] = [
  {
    name: "Start",
    desc: "",
    component: ActiveHomePage,
    requiredRole: undefined,
    initialPage: true,
  },
  {
    name: "Administera organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    component: EditCommitteePage,
    requiredRole: undefined,
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
  // {
  //   name: "Administera Zaloonen",
  //   desc: "Här kan du som sittande i ZÅG administrera och se bokningar i Zaloonen.",
  //   route: "/active/zaloonen",
  //   requiredRole: AccountRoles.ZALOONEN,
  // },
];
