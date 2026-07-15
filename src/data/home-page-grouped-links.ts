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
  
 
];
