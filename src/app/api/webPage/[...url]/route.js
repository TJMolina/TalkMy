import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
export async function GET(request, { params }) {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    await page.goto(params.url.join('/'));
    try{
        await new Promise(e=> setTimeout(e, 5000));
    }
    let data = await page.evaluate(async () => {
        if (document.querySelector('title')?.innerText.toLowerCase().match(/^un momento|^just a moment|^wait/)) return ['Pagina protegida por CloudFlare... :('];

        // const elementsToRemove = ['style', 'header', 'footer', 'script', 'iframe', 'img', 'svg', 'input', 'textarea', 'dialog', 'select', 'button', 'aside'];
        // elementsToRemove.forEach(selector => [...document.querySelectorAll(selector)].forEach(e => e.remove()));

        let html = document.querySelectorAll('main > *')
        if (!html) html = document.querySelectorAll('body > *');

        return Array.from(html, e => e.innerHTML).join('');

    })

    data = data.replace(/<head>.*<\/head>/s, '');
    data = data.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/si, '');
    data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i, '');
    data = data.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/i, '');
    data = data.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/i, '');
    data = data.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/i, '');
    data = data.replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/i, '');
    data = data.replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/i, '');
    data = data.replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/i, '');
    data = data.replace(/<dialog\b[^<]*(?:(?!<\/dialog>)<[^<]*)*<\/dialog>/i, '');

    await browser.close();
    return NextResponse.json({ data });
}