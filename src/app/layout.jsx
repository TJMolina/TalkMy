import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/textArea.css";
import "@/styles/botones.css";
import "@/styles/labels.css";
import "@/styles/notas.css";
import "@/styles/moviles.css";
import Container from "@/componentes/container";
import { MainProvider } from "./context/mainContext";
export const metadata = {
  title: "TalkMy!",
  description: "Leer texto app."
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <MainProvider>
          <Container>{children}</Container>
        </MainProvider>
      </body>
    </html>
  );
}
