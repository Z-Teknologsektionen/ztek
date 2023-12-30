import { AccountRoles } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RoleWrapper from "~/components/layout/RoleWrapper";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { activeRoutes } from "~/data/routes";

const AdminHomePage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>(() => {
    // Get the selected tab from localStorage when the component mounts
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedTab") || undefined;
    }
  });

  useEffect(() => {
    if (selectedTab) {
      localStorage.setItem("selectedTab", selectedTab);
    }
  }, [selectedTab]);

  const { data: session } = useSession({ required: true });

  if (!session) return null;

  const { user } = session;

  const availableRoutes = activeRoutes.filter(
    (route) =>
      route.requiredRole === undefined ||
      user.roles.includes(route.requiredRole) ||
      user.roles.includes(AccountRoles.ADMIN),
  );
  const initialTab = availableRoutes.find((route) => route.initialPage);

  return (
    <RoleWrapper accountRole={undefined}>
      <Tabs
        defaultValue={selectedTab || initialTab?.name}
        onValueChange={setSelectedTab}
      >
        <div className="w-full bg-zBlack">
          <Separator
            className="mx-auto my-0 h-1 w-[10%] rounded-md bg-zDarkGray "
            color="white"
          />
        </div>
        <ScrollArea className="w-full">
          <div className="flex justify-center space-x-2">
            <TabsList className="min-w-max rounded-none bg-zBlack px-4 text-white md:px-6 lg:rounded-b-2xl xl:px-4">
              {availableRoutes.map((route) => {
                return (
                  <TabsTrigger
                    key={route.name}
                    className="z-10 flex min-w-fit overflow-hidden"
                    style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    value={route.name}
                  >
                    {route.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          <div className="bg-zDark h-2" />
          <ScrollBar
            className="h-2 bg-zBlack"
            color="white"
            forceMount={true}
            orientation="horizontal"
          />
        </ScrollArea>
        {availableRoutes.map((route) => {
          return (
            <TabsContent key={route.name} value={route.name}>
              <route.component />
            </TabsContent>
          );
        })}
      </Tabs>
    </RoleWrapper>
  );
};

export default AdminHomePage;
