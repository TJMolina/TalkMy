import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/textArea.css";
import "@/styles/botones.css";
import "@/styles/labels.css";
import "@/styles/notas.css";
import "@/styles/moviles.css";
export const metadata = {
  title: "TalkMy!",
  description: "Leer texto app.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <div id="google_translate_element"></div>
        <script src='/traductor.js' />
      </body>
    </html>
  );
}
