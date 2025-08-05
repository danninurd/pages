// Ganti URL ini dengan URL website sumber yang kontennya ingin Anda tampilkan
const SOURCE_URL = "https://putar.in";

export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const newUrl = new URL(url.pathname, SOURCE_URL);

  const newRequest = new Request(newUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow'
  });

  const response = await fetch(newRequest);
  return response;
};
