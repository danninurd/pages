// URL sumber yang akan diproxy
const SOURCE_URL = "https://putar.in";

// Script Histats yang akan diinject
const HISTATS_SCRIPT = `
<script type="text/javascript">
  var _Hasync= _Hasync|| [];
  _Hasync.push(['Histats.start', '1,4583914,4,0,0,0,00010000']);
  _Hasync.push(['Histats.fasi', '1']);
  _Hasync.push(['Histats.track_hits', '']);
  (function() {
    var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
    hs.src = ('//s10.histats.com/js15_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
  })();
</script>
<noscript>
  <a href="/" target="_blank">
    <img src="//sstatic1.histats.com/0.gif?4583914&101" alt="" border="0">
  </a>
</noscript>
`;

// Fungsi utama
export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const newUrl = new URL(url.pathname + url.search, SOURCE_URL);

  // Teruskan request ke sumber
  const newRequest = new Request(newUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: "follow"
  });

  const response = await fetch(newRequest);

  // Cek tipe konten
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    let body = await response.text();

    // Inject Histats sebelum </body>
    body = body.replace("</body>", `${HISTATS_SCRIPT}</body>`);

    // Replace teks: dramaboss → dramacina
    body = body.replace(/layardrama21/gi, "layardramaxxi");

    return new Response(body, {
      status: response.status,
      headers: { "content-type": "text/html" }
    });
  }

  // Untuk non-HTML (CSS, JS, gambar, dll), kembalikan apa adanya
  return response;
};
