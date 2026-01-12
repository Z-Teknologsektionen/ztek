import simplifySchedule from "./simplify-schedule";

export async function GET(
  scheduleRequest: Request,
  { params }: { params: { calID: string } },
): Promise<Response> {
  //

  let timeeditResponse: Response;
  const timeeditRequest: Request = new Request(
    `https://cloud.timeedit.net/chalmers/web/public/${params.calID}.ics`,
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

  //parse and edit
  let icsCal: string;
  let calName: string;
  try {
    ({ icsCal, name: calName } = simplifySchedule(
      await timeeditResponse.text(),
    ));
  } catch (error) {
    return new Response(
      "ics parsing error: .ics file from TimeEdit could not be parsed",
      {
        status: 500,
      },
    );
  }

  // make response
  return new Response(icsCal, {
    headers: {
      "Content-Type": `text/calendar; charset=utf-8`,
      "Content-Disposition": `attachment; filename="${calName}.ics"`,
    },
  });
}
