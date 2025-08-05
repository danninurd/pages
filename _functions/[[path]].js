export async function onRequest(context) {
  return new Response("Hello from Pages Functions", {
    headers: { "Content-Type": "text/plain" }
  });
}
