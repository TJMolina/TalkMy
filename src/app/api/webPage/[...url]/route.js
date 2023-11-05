import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';
import request from "request-promise";
export const GET = async (req, { params }) => {
    try {
        const url = params.url.join('/').replace(/https?:\/\/?/, 'https://');
        const $ = await request({
            uri: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
                'credentials': 'include',
                'Origin': 'https://talkmy.vercel.app/'
            },
            transform: body => cheerio.load(body)
        });
        $('style, script, iframe, nav, header, footer, aside, button, select, dialog, noscript, svg, input').remove();
        $('body *').removeAttr('class').removeAttr('style').removeAttr('href');
        let html = $('body').html();
        return NextResponse.json(html);

    } catch (error) {
        return NextResponse.json(error);
    }
}