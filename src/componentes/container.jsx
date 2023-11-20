import Script from "next/script";
export default function Container({children}){
    return(
     <div className="container">
        <div id="google_translate_element"></div>
        {children}
        <Script src="/traductor.js" />
     </div>
    )
}