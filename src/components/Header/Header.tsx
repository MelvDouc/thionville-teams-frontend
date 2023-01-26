import Link from "../Link/Link.jsx";
import "./Header.scss";

export default function Header({ setUrl }: {
  setUrl: (url: string) => void;
}) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/joueurs" setUrl={setUrl}>Joueurs</Link>
          </li>
          <li>
            <Link href="/equipes" setUrl={setUrl}>Équipes</Link>
          </li>
          <li>
            <Link href="/matchs" setUrl={setUrl}>Matchs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}