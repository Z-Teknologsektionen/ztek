export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  // const file = formData.get("file");
  console.log("form data", formData);
  return new Response("Hello, Next.js!");
}
