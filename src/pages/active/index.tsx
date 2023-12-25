"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import RoleWrapper from "~/components/layout/RoleWrapper";
import { Separator } from "~/components/ui/separator";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { activeRoutes, adminRoutes } from "~/data/routes";

const AdminHomePage: NextPage = () => {
  const { data: session } = useSession({ required: true });

  if (!session) return null;

  const { user } = session;

  const availableRoutes = activeRoutes.filter(
    (route) =>
      route.requiredRole === undefined ||
      user.roles.includes(route.requiredRole) ||
      user.admin,
  );

  if (user.admin) availableRoutes.push(...adminRoutes);
  const initialRoute = availableRoutes.find((route) => route.initialPage);
  // const numRoutes = activeRouteCount + (user.admin ? adminRoutesCount : 0);

  return (
    <RoleWrapper accountRole={undefined}>
      <div className="w-full bg-zBlack">
        <Separator
          className="mx-auto my-0 h-1 w-[40%] rounded-md bg-zDarkGray "
          color="white"
        />
      </div>
      <Tabs className="w-full" defaultValue={initialRoute?.name}>
        {/* TODO: Add scrollbar if to many values */}
        <TabsList
          className={`xl:px-4" z-30 flex h-12 w-full space-x-4 overflow-auto rounded-none bg-zBlack px-4 text-white md:px-6`}
        >
          {availableRoutes.map((route) => {
            return (
              <TabsTrigger
                key={route.name}
                className="mx-2 min-w-fit overflow-hidden"
                style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                value={route.name}
              >
                {route.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {availableRoutes.map((route) => {
          return (
            <TabsContent key={route.name} value={route.name}>
              {/* {route.name} */}
              <route.component />
            </TabsContent>
          );
        })}
      </Tabs>
    </RoleWrapper>
  );
};

export default AdminHomePage;
