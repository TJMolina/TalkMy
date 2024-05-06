import { NextResponse } from "next/server";
import cheerio from 'cheerio';
import axios from "axios";

export const GET = async (req, { params }) => {
    const url = params.url.join('/').replace(/https?:\/\/?/,'https://');
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/${(Math.random() * (100 - 600) + min).toFixed(2)} (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/${(Math.random() * (100 - 600) + min).toFixed(2)}`
            }
        });
        const $ = cheerio.load(response.data);
        // Remove unwanted elements and attributes
        $('style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input, textarea').remove();
        $('[class], [style], [href]').removeAttr('class style href');
        
        // Compact HTML and remove unnecessary whitespace
        let html = $('body').html().replace(/\n/g, "");
        
        return NextResponse.json(html);
    } catch (error) {
        try {
            const op2 = await extraerTextoPagina_op2(url);
            return NextResponse.json(op2); // Devolver un mensaje si se cumple otra condición
        } catch (error) {
            return NextResponse.error(new Error("Fallo al obtener el texto.")); // Devolver un error si no se cumple ninguna condición
        }
    }
}


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
