import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { courseData } from "~/data/course-data";

export const CoursesSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle className="text-center">Kurser</SectionTitle>
      <p className="text-left">
        På Chalmers inleds civilingenjörsprogrammen med tre år av varierande
        studier som bygger upp en gedigen teknisk kompetens. Första året på
        Automation & Mekatronik fokuserar på grundläggande ämnen som matematik,
        programmering och fysik. Under det andra året introduceras kärnkurser
        inom automation, reglerteknik och elektronik. Det tredje året markerar
        en fördjupning genom avancerade kurser inom mekatronik, realtidssystem
        och instrumentering. Under detta år får studenten välja kurser som
        passar deras intressen, och under våren genomförs kandidatarbete. Efter
        dessa tre år väljer studenterna ett masterprogram för ytterligare
        specialisering och fördjupning inom sitt valda område. Denna
        strukturerade progression ger studenterna möjlighet att successivt
        specialisera sig och skapar en stark teknisk grund för framtida studier
        och en karriär inom automations- och mekatroniksektorn. Nedan följer en
        översikt över de kurser som ingår under de tre första åren, tryck på en
        kurs för att läsa mer
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {Object.entries(courseData).map(([year, periods], yearIndex) => (
          <div key={yearIndex} className="rounded border p-4 shadow">
            <h2 className="mb-2 text-center text-xl font-bold">{year}</h2>
            {Object.entries(periods).map(([period, courses], periodIndex) => (
              <div key={periodIndex} className="mb-4">
                <h3 className="mb-1 border-b border-gray-400 text-lg font-semibold">
                  {period}
                </h3>
                {courses.map(
                  ({ courseName, points, followUp, url }, courseIndex) => (
                    <div
                      key={courseIndex}
                      className="mb-1 flex flex-row justify-between text-slate-500"
                    >
                      <div className="shrink">
                        <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
                          <Tooltip>
                            <TooltipTrigger>
                              <a
                                className="line-clamp-1 text-left font-medium hover:text-blue-500"
                                href={url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {courseName}
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>{courseName}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex shrink-0 items-center">
                        {followUp && (
                          <em className="mr-2 text-xs text-red-500">
                            Fortsättning
                          </em>
                        )}
                        <p className="mr-2 text-sm text-gray-600">
                          {points} HP
                        </p>
                      </div>
                    </div>
                  ),
                )}
                {courses.length < 3 &&
                  Array.from({ length: 3 - courses.length }).map((_, i) => (
                    <div key={i} className="invisible">
                      Invisible Course
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
