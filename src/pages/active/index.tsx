import { AccountRoles } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RoleWrapper from "~/components/layout/RoleWrapper";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { activeTabs } from "~/data/activeTabs";

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

  const initialTab = activeTabs.find((tab) => tab.initialTab);

  const userHasPermission = (tabName: string): boolean => {
    const tab = activeTabs.find((r) => r.name === tabName);
    const hasPermission =
      tab &&
      (tab.requiredRole === undefined ||
        user.roles.includes(tab.requiredRole) ||
        user.roles.includes(AccountRoles.ADMIN));
    return hasPermission || false;
  };

  return (
    <RoleWrapper accountRole={undefined}>
      <Tabs
        defaultValue={
          selectedTab && userHasPermission(selectedTab)
            ? selectedTab
            : initialTab?.name
        }
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
              {activeTabs.map((tab) => {
                if (
                  tab.requiredRole === undefined ||
                  user.roles.includes(tab.requiredRole) ||
                  user.roles.includes(AccountRoles.ADMIN)
                ) {
                  return (
                    <TabsTrigger
                      key={tab.name}
                      className="z-10 flex min-w-fit overflow-hidden"
                      disabled={
                        !(
                          tab.requiredRole === undefined ||
                          user.roles.includes(tab.requiredRole) ||
                          user.roles.includes(AccountRoles.ADMIN)
                        )
                      }
                      style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      value={tab.name}
                    >
                      {tab.name}
                    </TabsTrigger>
                  );
                }
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
        {activeTabs.map((tab) => {
          return (
            <TabsContent key={tab.name} value={tab.name}>
              <tab.component />
            </TabsContent>
          );
        })}
      </Tabs>
    </RoleWrapper>
  );
};

export default AdminHomePage;
