import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
export async function GET(request, { params }) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(params.url.join('/'));

    let data = await page.content();
    //Limpiar todo el texto para mostrarlo correctamente en la pagina
    data = data.replace(/<head>.*<\/head>/s, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/si, '')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i, '')
        .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/i, '')
        .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/i, '')
        .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/i, '')
        .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/i, '')
        .replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/i, '')
        .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/i, '')
        .replace(/<dialog\b[^<]*(?:(?!<\/dialog>)<[^<]*)*<\/dialog>/i, '');
    await browser.close();
    return NextResponse.json({ data });
}