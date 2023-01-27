import Link from "../Link/Link.jsx";
import "./Header.scss";

export default function Header() {
  return (
    <header className="container-xxl bg-primary text-white px-3 py-2">
      <article className="row">
        <div className="col col-lg-auto">
          <h1 className="fs-3 m-0 p-0">Thionville Échecs —&nbsp;Équipes N3</h1>
        </div>
        <div className="col">
          <nav className="h-100 d-flex justify-content-end align-items-center">
            <ul className="d-flex gap-3 m-0">
              <li><Link href="/joueurs">Joueurs</Link></li>
              <li><Link href="/equipes">Équipes</Link></li>
              <li><Link href="/matchs">Matchs</Link></li>
            </ul>
          </nav>
        </div>
      </article>
    </header>
  );
}