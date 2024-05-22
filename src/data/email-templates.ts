export const apporovedBookingMessage = ({
  eventName,
  firstHandDate,
  organizerName,
  startDateTime,
}: {
  eventName: string;
  firstHandDate: boolean;
  organizerName: string;
  startDateTime: Date;
}): string => `
  "Hej ${organizerName}"!
  
  Er förfrågan om att boka Zaloonen för eventet ${eventName} har blivit beviljad för ${
    firstHandDate ? "förstahandsdatumet" : "andrahandsdatumet"
  }, dvs ${startDateTime.toLocaleString()}.\n\n
  När det är dags för er bokning så är det bara att dyka upp. Nycklar till soprummet i lådan över värmeskåpen. När ni är klara med arrangemanget är det dags att städa, då utför ni alla uppgifter på dokumentet 'Checklista efter Arrangemang' som sitter i zaloonenpärmen som står på hyllan bakom kylskåpen.\n\n
  Avsyning sker vardagar 07.30 och på helger 11.30 om ni inte en annan överenskommelse med ZÅG har gjorts.\n\n
  Mvh\n
  ZÅG`;

export const getDeniedBookingMessage = ({
  eventName,
  organizerName,
}: {
  eventName: string;
  organizerName: string;
}): string =>
  `Hej ${organizerName}!\n\n
  Er förfrågan om att boka Zaloonen för eventet ${eventName} har blivit avslagen. Detta innebär alltså att ni tyvärr varken fått ert första- eller andrahandsdatum.\n\n
  Mvh\n
  ZÅG";`;

export const getBookingRecivedMessage = ({
  eventName,
  organizerName,
}: {
  eventName: string;
  organizerName: string;
}): string =>
  `Hej ${organizerName}!\n\n
  Er förfrågan om att boka Zaloonen för eventet ${eventName} har blivit registrerad. Förfrågan kommer att behandlas fortast möjliga av ZÅG, vilket normalt sett är inom 2 veckor. Ni kommer då få ett nytt mail med besked om er bokningsförfrågan.\n\n
  OBS detta mejl går ej att svara på!\n\n
  Mvh\n
  ZÅG`;
