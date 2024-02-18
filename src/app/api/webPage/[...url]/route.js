import { NextResponse } from "next/server";
import cheerio from 'cheerio';
import axios from "axios";
import he from 'he';
export const GET = async (req, { params }) => {
    const url = params.url.join('/').replace(/https?:\/\/?/,'https://');
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);
        // Remove unwanted elements and attributes
        $('style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input, textarea').remove();
        $('[class], [style], [href]').removeAttr('class style href');
        
        // Compact HTML and remove unnecessary whitespace
        let html = $('body').html().replace(/\n/g, "").replace(/<p>&nbsp;<\/p>/g, "");
        
        return NextResponse.json(he.decode(html));
    } catch (error) {
        console.log("error.");
        const op2 = await extraerTextoPagina_op2(url);
        return NextResponse.json(he.decode(op2) || error);
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
