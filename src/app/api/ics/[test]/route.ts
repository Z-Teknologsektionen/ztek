import simplifySchedule from "./simplify-schedule";

export async function GET(
  scheduleRequest: Request,
  { params }: { params: { test: string } },
): Promise<Response> {
  //

  let timeeditResponse: Response;
  const timeeditRequest: Request = new Request(
    `https://cloud.timeedit.net/chalmers/web/public/ri6y7YQQu9QZnZQ18Z44beZ35680Q.ics`,
    //`https://cloud.timeedit.net/chalmers/web/public/${params.test}.ics`,
    //`https://translate.google.com/BOB?sl=en&tl=sv&op=translate`,
  );

  //poll TimeEdit
  try {
    timeeditResponse = await fetch(timeeditRequest);
  } catch (error) {
    return new Response("TimeEdit networking error", { status: 504 });
  }

  //checks
  if (!timeeditResponse.ok)
    return new Response(
      timeeditResponse.status === 404
        ? "TimeEdit calendar not found"
        : "Unexpected behaviour from TimeEdit",
      { status: 502 },
    );
  const timeeditResponseContentType =
    timeeditResponse.headers.get("Content-Type"); //read the HTTP header
  if (
    timeeditResponseContentType &&
    timeeditResponseContentType?.indexOf("text/calendar") === -1
  ) {
    return new Response(
      `TimeEdit answered with non-calendar content: "${timeeditResponseContentType}"`,
      {
        status: 502,
      },
    );
  }
  if (timeeditResponse.body === null)
    return new Response("TimeEdit answered without calendar data", {
      status: 502,
    });

  //TODO: check fail to edit schedule

  //make response
  return new Response(simplifySchedule(await timeeditResponse.text()), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${params.test}.ics"`,
    },
  });
}

//https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream
//https://developer.mozilla.org/en-US/docs/Web/API/Response
