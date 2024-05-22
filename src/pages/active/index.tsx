import { AccountRoles } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import TabInformationSection from "~/components/active/tab-information-section";
import RoleWrapper from "~/components/layout/role-wrapper";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { activeTabs } from "~/data/active-tabs";
import { useRequireAuth } from "~/hooks/useRequireAuth";

const ActiveHomePage: NextPage = () => {
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

  const { data: session } = useRequireAuth();

  if (!session) return null;
  const { user } = session;

  const hasPermission = (role?: AccountRoles): boolean =>
    role === undefined ||
    user.roles.includes(role) ||
    user.roles.includes(AccountRoles.ADMIN);

  const userHasPermission = (tabName: string): boolean => {
    const tab = activeTabs.find((r) => r.name === tabName);
    return (tab && hasPermission(tab.requiredRole)) || false;
  };

  const availableTabs = activeTabs.filter(({ requiredRole }) =>
    hasPermission(requiredRole),
  );
  const initialTab = activeTabs.find((tab) => tab.initialTab);

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
            <TabsList className="h-12 min-w-max rounded-none rounded-b-2xl bg-zBlack/90 py-6 text-white md:px-6 xl:px-4">
              {availableTabs.map((tab) => (
                <TabsTrigger
                  key={tab.name}
                  className="flex min-w-fit overflow-hidden truncate"
                  value={tab.name}
                >
                  {tab.icon && <tab.icon size={20} />}
                  {tab.name}
                </TabsTrigger>
              ))}
              <div className="bg-zDark h-2" />
              <ScrollBar
                className="mx-4 h-2 bg-zBlack"
                color="white"
                forceMount={true}
                orientation="horizontal"
              />
            </TabsList>
          </div>
        </ScrollArea>
        {activeTabs.map((tab) => {
          return (
            <TabsContent key={tab.name} value={tab.name}>
              {tab.name !== "Start" && (
                <TabInformationSection
                  description={tab.desc}
                  instructions={tab.instructions}
                  title={tab.name}
                />
              )}
              <tab.component />
            </TabsContent>
          );
        })}
      </Tabs>
    </RoleWrapper>
  );
};

export default ActiveHomePage;
