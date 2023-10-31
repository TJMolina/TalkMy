import "@/styles/global.css";
import "@/styles/variables.css";
import "@/styles/textArea.css";
import "@/styles/botones.css";
import "@/styles/labels.css";
import "@/styles/pseudoclases.css";
import "@/styles/notas.css";
import "@/styles/moviles.css";
export const metadata = {
  title: "TalkMy!",
  description: "Leer texto app.",
}
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <footer>Molina - Corpache - Ayaviri - Colque.</footer>
      </body>
    </html>
  )
}
