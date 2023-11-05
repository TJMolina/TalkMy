import { NextResponse } from "next/server";

export const GET = async (req)=>{
    const response = await fetch('https://ncode.syosetu.com/n2267be/643/');
    const res = await response.text();


    return NextResponse.json(res);
}

//     //Limpiar todo el texto para mostrarlo correctamente en la pagina
//     data = data.replace(/<head>.*<\/head>/s, '')
//         .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/si, '')
//         .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i, '')
//         .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/i, '')
//         .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/i, '')
//         .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/i, '')
//         .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/i, '')
//         .replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/i, '')
//         .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/i, '')
//         .replace(/<dialog\b[^<]*(?:(?!<\/dialog>)<[^<]*)*<\/dialog>/i, '');
//     return NextResponse.json({ data });
// }