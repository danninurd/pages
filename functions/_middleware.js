export async function onRequest(context) {
  const target = "https://dramacina.online";
  const url = new URL(context.request.url);
  const proxyUrl = target + url.pathname + url.search;

  const response = await fetch(proxyUrl);
  let body = await response.text();

  // Contoh inject kode tracking
  body = body.replace("</body>", '<script src="https://example.com/histats.js"></script></body>');

  return new Response(body, {
    status: response.status,
    headers: { "content-type": "text/html" }
  });
}
