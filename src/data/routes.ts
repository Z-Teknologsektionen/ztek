import { AccountRoles } from "@prisma/client";

export interface AdminRouteProps {
  desc: string;
  name: string;
  route: string;
}

export interface ActiveRouteProps extends AdminRouteProps {
  requiredRole: AccountRoles | undefined;
}

export const adminRoutes: AdminRouteProps[] = [
  {
    name: "Administrera medlemmar",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/admin/members",
  },
  {
    name: "Administrera organ",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/admin/organ",
  },
];

export const activeRoutes: ActiveRouteProps[] = [
  {
    name: "Skapa event",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rerum magnam soluta facilis repellat dolorum est! Maxime adipisci dolore rerum nihil aliquid architecto exercitationem perspiciatis sed! Dolorem facere fugiat placeat.",
    route: "/active/events",
    requiredRole: AccountRoles.CREATE_POST,
  },
  {
    name: "Administera Organet",
    desc: "Har du precis gått på och vill byta namn på sittande och byta logga? Klicka här då :)",
    route: "/organ/edit",
    requiredRole: undefined,
  },
  {
    name: "Administera Dokument",
    desc: "Här kan du ta bort eller lägga till olika dokument.",
    route: "/active/documents",
    requiredRole: AccountRoles.MODIFY_DOCUMENTS,
  },
  {
    name: "Administera Zaloonen",
    desc: "Här kan du som sittande i ZÅG administrera och se bokningar i Zaloonen.",
    route: "/active/zaloonen",
    requiredRole: AccountRoles.ZALOONEN,
  },
];