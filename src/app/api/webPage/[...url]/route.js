import { NextResponse } from "next/server";
import cheerio from "cheerio";
import axios from "axios";

function generateRandomFetchOptions() {
  // Generar un User-Agent aleatorio
  const randomUserAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/91.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
    "Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
  ];

  // Generar encabezados aleatorios
  const randomHeaders = {
    Accept: "*/*",
    Authorization: `Bearer ${Math.random().toString(36).substring(2, 15)}`,
    "Content-Type": "text/plain",
    "User-Agent":
      randomUserAgents[Math.floor(Math.random() * randomUserAgents.length)],
  };

  // Configuración aleatoria para otras opciones de fetch
  const options = {
    headers: randomHeaders,
    cache: "force-cache",
    credentials: "omit",
    referrerPolicy: "no-referrer",
  };

  return { options };
}
export const GET = async (req, { params }) => {
  const url = params.url.join("/").replace(/https?:\/\/?/, "https://");
  const { options } = generateRandomFetchOptions();
  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    // Remove unwanted elements and attributes
    $(
      "style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input, textarea"
    ).remove();
    $("[class], [style], [href]").removeAttr("class style href");

    // Compact HTML and remove unnecessary whitespace
    let html = $("body").html().replace(/\n/g, "");
    return NextResponse.json(html);
  } catch {
    return NextResponse.json(
      `<p>Fallo al obtener el texto. \n${JSON.stringify(options)}</p>`
    );
  }
};

const extraerTextoPagina_op2 = async (url) => {
  try {
    const formData = new FormData();
    formData.append("url", url);
    const response = await axios.post(
      "https://bdtalkmy.000webhostapp.com/AcionNotas/extraerTextoPagina.php",
      formData
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
