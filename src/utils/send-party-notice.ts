import axios from "axios";
import { type z } from "zod";
import { sendPartNoticeSchema } from "~/schemas/zaloonen-booking";

const PARTY_NOTICE_API_URL =
  "https://www.chalmers.se/api/form/?id=7ecd65dc-e80b-4662-a986-5295ee260e33";

const defaultPartyNoticeValues = {
  values: {
    sektionslokal: "Zaloonen, (Z-sektionen) 70 platser",
    antalDeltagare: "70",
    styrelsesMedgivandeFinns: "on",
    dataConsent: "on",
  },
  culture: "sv",
  contentId: 3835,
} as const;

type ServingPermitType = "Finns" | "Ej aktuellt";

type PartyNoticeValuesType = {
  contentId: 3835;
  culture: "sv";
  values: {
    TidForStart: string;
    antalDeltagare: "70";
    arrangemangetsBenamning: string;
    arrangemangsansvarigsEPostadress: string;
    arrangemangsansvarigsMobiltelefon: string;
    arrangemangsansvarigsNamn: string;
    arrangor: string;
    dataConsent: "on";
    datumOchTidForSlut: string;
    sektionslokal: "Zaloonen, (Z-sektionen) 70 platser";
    serveringstillstand: ServingPermitType;
    styrelsesMedgivandeFinns: "on";
  };
};

const formatDateTimeForPartyNotice = (date: Date): string => {
  return date.toLocaleString("SE-sv");
};

export const sendPartyNotice = async (
  props: z.infer<typeof sendPartNoticeSchema>,
): Promise<string> => {
  const safeParse = sendPartNoticeSchema.safeParse(props);

  if (!safeParse.success) throw new Error("Ogiltig input");

  const validatedData = safeParse.data;

  if (validatedData.startDate < new Date())
    throw new Error("Start datum har passerat");

  const formattedBody: PartyNoticeValuesType = {
    ...defaultPartyNoticeValues,
    values: {
      ...defaultPartyNoticeValues.values,
      arrangemangetsBenamning: validatedData.eventName,
      arrangemangsansvarigsEPostadress: validatedData.partyManagerEmail,
      arrangemangsansvarigsMobiltelefon: validatedData.partyManagerPhone,
      arrangemangsansvarigsNamn: validatedData.partyManagerName,
      arrangor: validatedData.organizerName,
      datumOchTidForSlut: formatDateTimeForPartyNotice(validatedData.endDate),
      serveringstillstand: validatedData.hasServingPermit
        ? "Finns"
        : "Ej aktuellt",
      TidForStart: formatDateTimeForPartyNotice(validatedData.startDate),
    },
  };

  const res = await axios.post(PARTY_NOTICE_API_URL, formattedBody);
  return res.statusText;
};
