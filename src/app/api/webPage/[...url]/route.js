import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import request from "request-promise";
export const GET = async (req,{params}) => {
    const url = params.url.join('/').replace(/https?:\/\/?/,'https://');
    try {
        const $ = await request({
            uri: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
            },
            transform: body => cheerio.load(body)
        });
        $('style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input, textarea').remove();
        $('body *').removeAttr('class').removeAttr('style').removeAttr('href');
        let html = $('body').html();
        return NextResponse.json(html);
        
    } catch (error) {
        const op2 = await extraerTextoPagina_op2(url);
        if(op2){
            return NextResponse.json(op2)
        }
        return NextResponse.json(error)
    }
}

const extraerTextoPagina_op2 = async (url) => {
    try {
      const urlBuscar = new FormData();
      urlBuscar.append("url", url);
      const respuestaFetchPHP = await fetch(
        "https://bdtalkmy.000webhostapp.com/AcionNotas/extraerTextoPagina.php",
        { method: "POST", body: urlBuscar }
      );
      const respuestaPHP = await respuestaFetchPHP.text();
      return respuestaPHP;
    } catch (e) {
      return false;
    }
  };