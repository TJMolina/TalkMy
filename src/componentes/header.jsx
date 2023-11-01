import Link from "next/link";
export default function Header({ children }) {
    return (
        <header className="encabezado">
            <p><Link href="/">TalkMy!</Link></p>
            {children}
        </header>
    );
}