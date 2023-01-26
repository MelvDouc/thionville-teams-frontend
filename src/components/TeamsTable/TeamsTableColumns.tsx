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
    header: "Contact",
    getRow: ({ name, email, tel, website }) => {
      return (
        <address className="pre-line">
          <div><a href={`mailto:${email}`}>{email}</a></div>
          {tel && <div>{tel}</div>}
          {website && <div><a href={"http://" + website}>Site de {name}</a></div>}
        </address>
      );
    }
  }
];

export default TeamsTableColumns;