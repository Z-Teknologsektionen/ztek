export type HomePageLinkType = {
  title: string;
  url: string;
};

export type HomePageGroupedLinksType = {
  links: HomePageLinkType[];
  title: string;
}[];

export const homePageGroupedLinks = [
  {
    title: "Studier",
    links: [
      {
        title: "Canvas",
        url: "https://canla.portal.chalmers.se/canvaslogin/discovery.html?v=1",
      },
      { title: "Outlook", url: "https://outlook.office.com/owa/chalmers.se" },
      {
        title: "Ladok",
        url: "https://www.student.ladok.se/student/app/studentwebb/",
      },
      { title: "Tentastatistik", url: "https://stats.ftek.se/" },
      { title: "Utskrift på Chalmers", url: "https://papercut.chalmers.se/" },
    ],
  },
  {
    title: "Schema & Campus",
    links: [
      {
        title: "Lunchmeny",
        url: "https://chalmerskonferens.se/en/lunchmenyer-johanneberg/",
      },
      {
        title: "Boka Grupprum",
        url: "https://cloud.timeedit.net/chalmers/web/b1",
      },
      {
        title: "Schema TKAUT-1",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y015Q42x4956g580YQQ697.html",
      },
      {
        title: "Schema TKAUT-2",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y085Q42x4956g580YQQ677.html",
      },
      {
        title: "Schema TKAUT-3",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Y93ygZ05ZZQQ1X65v7Y075Q42x4956g580YQQ687.html",
      },
      {
        title: "Timeedit",
        url: "https://cloud.timeedit.net/chalmers/web/?en=t",
      },
      {
        title: "Felanmäl Lokaler",
        url: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
      },
      {
        title: "Trygg på chalmers",
        url: "https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/",
      },
    ],
  },
  {
    title: "Sektionen",
    links: [
      { title: "Zaloonen", url: "/student-division/zaloonen" },
      {
        title: "Activity@Z",
        url: "https://www.facebook.com/groups/activityatz",
      },
      {
        title: "Kårappen iOS",
        url: "https://apps.apple.com/se/app/chalmers-studentk%C3%A5r/id1633440660",
      },
      {
        title: "Kårappen Android",
        url: "https://play.google.com/store/apps/details?id=com.helo.karappen",
      },
    ],
  },
];
