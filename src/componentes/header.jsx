import Link from "next/link";
export default function Header({ children }) {
    return (
        <header>
            <h1><Link href="/">TalkMy!</Link></h1>
            {children}
        </header>
    );
}