import Link from "../Link/Link.jsx";
import "./Header.scss";

export default function Header() {
  return (
    <header>
      <div className="header__left">
        <h1>Thionville Échecs — Équipes N3</h1>
      </div>
      <div className="header__right">
        <nav>
          <ul>
            <li><Link href="/joueurs">Joueurs</Link></li>
            <li><Link href="/equipes">Équipes</Link></li>
            <li><Link href="/matchs">Matchs</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}