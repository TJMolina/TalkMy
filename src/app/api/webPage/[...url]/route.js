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
    Accept: ["application/json", "text/html", "application/xml", "*/*"][
      Math.floor(Math.random() * 4)
    ],
    Authorization: `Bearer ${Math.random().toString(36).substring(2, 15)}`,
    "Cache-Control": ["no-cache", "no-store", "max-age=0", "must-revalidate"][
      Math.floor(Math.random() * 4)
    ],
    "Content-Type": [
      "application/json",
      "application/x-www-form-urlencoded",
      "text/plain",
    ][Math.floor(Math.random() * 3)],
    "User-Agent":
      randomUserAgents[Math.floor(Math.random() * randomUserAgents.length)],
    "X-Custom-Header": Math.random().toString(36).substring(2, 15),
  };

  // Generar parámetros de consulta aleatorios
  const randomQueryParams = new URLSearchParams({
    search: Math.random().toString(36).substring(2, 10),
    page: Math.floor(Math.random() * 100),
    limit: Math.floor(Math.random() * 50 + 1),
    sort: ["asc", "desc"][Math.floor(Math.random() * 2)],
    randomFlag: Math.random() > 0.5 ? "true" : "false",
  });

  // Configuración aleatoria para otras opciones de fetch
  const options = {
    headers: randomHeaders,
    cache: ["default", "no-cache", "reload", "force-cache", "only-if-cached"][
      Math.floor(Math.random() * 5)
    ],
    credentials: ["omit", "same-origin", "include"][
      Math.floor(Math.random() * 3)
    ],
    mode: ["cors", "no-cors", "same-origin"][Math.floor(Math.random() * 3)],
    redirect: ["follow", "manual", "error"][Math.floor(Math.random() * 3)],
    referrerPolicy: [
      "no-referrer",
      "origin",
      "same-origin",
      "strict-origin",
      "unsafe-url",
    ][Math.floor(Math.random() * 5)],
    body: null, // Esto se llenará solo si el método requiere un cuerpo
  };

  return { options };
}

export const GET = async (req, { params }) => {
  const url = params.url.join("/").replace(/https?:\/\/?/, "https://");
  const { options } = generateRandomFetchOptions();
  const response = await axios.get(url, options);
  if(response.status == 200){
      const $ = cheerio.load(response.data);
      // Remove unwanted elements and attributes
      $(
        "style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input, textarea"
      ).remove();
      $("[class], [style], [href]").removeAttr("class style href");
    
      // Compact HTML and remove unnecessary whitespace
      let html = $("body").html().replace(/\n/g, "");
    
      return NextResponse.json(html);
  }
  else {
      //const op2 = await extraerTextoPagina_op2(url);
      //return NextResponse.error(new Error("Fallo al obtener el texto.")); // Devolver un error si no se cumple ninguna condición
      return NextResponse.json(`Fallo al obtener el texto. \n${options.headers["User-Agent"]}`);
      
      //return NextResponse.json(op2); // Devolver un mensaje si se cumple otra condición
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
