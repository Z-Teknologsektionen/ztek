export type HomePageLinkType = {
  title: string;
  url: string;
};

export type HomePageGroupedLinksType = {
  links: HomePageLinkType[];
  title: string;
}[];

export const homePageGroupedLinks: HomePageGroupedLinksType = [
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
        url: "https://cloud.timeedit.net/chalmers/web/student/",
      },
      {
        title: "Schema TKAUT-1",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7Y4QQ57Z07Q602464693501W6Z69000y.html",
      },
      {
        title: "Schema TKAUT-2",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7Y4QQ57Z07Q102464693508W6Z69000y.html",
      },
      {
        title: "Schema TKAUT-3",
        url: "https://cloud.timeedit.net/chalmers/web/public/ri1Q7Y4QQ57Z07Q202464693507W6Z69000y.html",
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
        title: "Orbi",
        url: "https://orbiapp.io/student",
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
