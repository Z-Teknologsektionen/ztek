import Image from "next/image";
import Link from "next/link";
import { Suspense, type FC } from "react";
import { getOneDocumentGroupByName } from "~/app/student-division/_utils/get-one-document-group-by-name";
import { SectionWithItemAndText } from "~/components/layout/section-with-item-and-text";
import StyledLink from "~/components/layout/styled-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";

const DOCUMENTGROUP_KEY = "Mallar för sektionsmötet";

const StudentDivisionMeetingDocuments: FC = async () => {
  const documentGroup = await getOneDocumentGroupByName(DOCUMENTGROUP_KEY);

  return (
    <div className="mr-2 grid grid-cols-4">
      {documentGroup &&
        documentGroup.documents.map((document) => (
          <div key={document.title} className="col-span-1 mx-2 mb-2 truncate">
            <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="text-sm hover:text-blue-800 hover:underline"
                    href={document.url}
                    target="_blank"
                  >
                    <Image
                      alt="Sektionens uppbyggnad"
                      height={100}
                      src="/document_stack.svg"
                      width={100}
                    />
                    <p className="truncate">{document.title}</p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-zWhite">
                  <p>{document.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
    </div>
  );
};

export const StudentDivisionMeetingSection: FC = () => {
  return (
    <SectionWithItemAndText
      id="sektionsmote"
      itemContent={
        // <ErrorBoundary fallback={<p>Dokument kunde inte hämtas.</p>}>
        <Suspense fallback={<p>Läser in dokument...</p>}>
          <StudentDivisionMeetingDocuments />
        </Suspense>
        // </ErrorBoundary>
      }
      textContent={
        <p>
          Sektionens högst beslutande organ är sektionsmötet som sammanträder
          minst 4 gånger varje år. På sektionsmötet avhandlas punkter så som
          inval, motioner, propositioner och interpellationer. Alla sektionens
          medlemmar är inbjudna till alla sektionsmöten och man uppmuntras
          starkt att gå på dessa. Alla beslut som tas på sektionsmötet är
          demokratiska där allas röst väger lika tungt. Finns det något du vill
          ändra på eller tycker du att sektionen saknar något? Isåfall kan du
          skriva en motion till sektionsmötet och skicka den till{" "}
          <StyledLink href="mailto:ztyret@ztek.se">ztyret@ztek.se</StyledLink>{" "}
          senast 7 dagar innan sektionsmötet. Det går också att skriva en{" "}
          <StyledLink
            href="https://sv.wikipedia.org/wiki/Interpellation"
            target="_blank"
          >
            interpellation
          </StyledLink>{" "}
          till sektionsmötet där du kan ställa frågor till olika organ.
        </p>
      }
      title="Sektionsmötet bestämmer"
    />
  );
};
