//

import simplifySchedule from "./simplify-schedule";

export async function GET(
  scheduleRequest: Request,
  { params }: { params: { test: string } },
): Promise<Response> {
  //

  //get timeedit calendar
  const timeeditRequest: Request = new Request(
    `https://cloud.timeedit.net/chalmers/web/public/ri6y7YQQu9QZnZQ18Z44beZ35680Q.ics`,
  );
  const timeeditResponse: Response = await fetch(timeeditRequest);

  //checks
  //TODO: ADD MORE CHECKS!!
  if (timeeditResponse.body === null) return Response.error();

  //make response
  const scheduleResponse: Response = new Response(
    simplifySchedule(timeeditResponse.body),
    {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="schedule.ics"`,
      },
    },
  );

  //return
  return scheduleResponse;
}

//https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream
//https://developer.mozilla.org/en-US/docs/Web/API/Response
