import { NextResponse } from "next/server";
import cheerio from "cheerio";
import axios from "axios";

function generateRandomFetchOptions() {
  // Generar un User-Agent aleatorio
  const randomUserAgents = [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/91.0",
    "Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0",
  ];

  // Generar encabezados aleatorios
  const randomHeaders = {
    Accept: "*/*",
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
