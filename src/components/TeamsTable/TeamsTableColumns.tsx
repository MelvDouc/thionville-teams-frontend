const TeamsTableColumns: TableColumn<Team>[] = [
  {
    header: "N° FFE",
    getRow: ({ id }) => <a href={`http://www.echecs.asso.fr/FicheClub.aspx?Ref=${id}`}>{id}</a>
  },
  {
    header: "Nom",
    getRow: (team) => team.name
  },
  {
    header: "Adresse",
    getRow: ({ address, city, zip }) => <div className="pre-line">{`${address}\n${zip} ${city}`}</div>
  },
  {
    header: "Email",
    getRow: (team) => <div><a href={`mailto:${team.email}`}>Contacter</a></div>
  },
  {
    header: "Tél.",
    getRow: (team) => team.tel
  },
  {
    header: "Site web",
    getRow: ({ website }) => website && <div><a href={"http://" + website} target="_blank">Visiter</a></div>
  }
];

export default TeamsTableColumns;