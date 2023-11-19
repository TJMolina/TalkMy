import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/labels.css";
import "@/styles/notas.css";
import "@/styles/textArea.css";
import "@/styles/botones.css";
import "@/styles/moviles.css";
import 'rsuite/dist/rsuite.min.css';
import Container from "@/componentes/container";
import { MainProvider } from "./context/mainContext";
export const metadata = {
  title: "TalkMy!",
  description: "Leer texto app.",
  manifest: "/manifest.json",
  icons:{
    apple: "/icon.png"
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <MainProvider>
          <Container>
            {children}
          </Container>
        </MainProvider>
      </body>
    </html>
  );
}
