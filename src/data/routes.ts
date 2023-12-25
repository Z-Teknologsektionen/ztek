import { AccountRoles } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";
import EditCommitteePage from "~/pages/active/committees/edit";
import EditDocumentsPage from "~/pages/active/documents";
import ActiveHomePage from "~/pages/active/index_old";
import AdminCommitteePage from "~/pages/admin/committees";
import AdminMemberPage from "~/pages/admin/members";
import AdminProgramBoardPage from "~/pages/admin/program-board";

export interface RouteProps {
  component: FC<PropsWithChildren>;
  desc: string;
  initialPage: boolean;
  name: string;
  requiredRole: AccountRoles | undefined;
}
// export interface ActiveRouteProps extends AdminRouteProps {}

export const adminRoutes: RouteProps[] = [
  {
    name: "Administrera medlemmar",
    desc: "Lägg till eller ta bort medlemmar i olika organ.",
    component: AdminMemberPage,
    requiredRole: "ADMIN",
    initialPage: false,
  },
  {
    name: "Administrera organ",
    desc: "Lägg till eller ta bort organ.",
    component: AdminCommitteePage,
    requiredRole: "ADMIN",
    initialPage: false,
  },
  {
    name: "Administrera programledningen",
    desc: "Lägg till, ta bort eller uppdatera någon i programledningen.",
    component: AdminProgramBoardPage,
    requiredRole: "ADMIN",
    initialPage: false,
  },
];

export const activeRoutes: RouteProps[] = [
  // {
  //   name: "Skapa event",
  //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
  //   route: "/active/events",
  //   requiredRole: AccountRoles.CREATE_POST,
  // },
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
    initialPage: false,
  },
  {
    name: "Administera dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    component: EditDocumentsPage,
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
    initialPage: false,
  },
  // {
  //   name: "Administera Zaloonen",
  //   desc: "Här kan du som sittande i ZÅG administrera och se bokningar i Zaloonen.",
  //   route: "/active/zaloonen",
  //   requiredRole: AccountRoles.ZALOONEN,
  // },
];
