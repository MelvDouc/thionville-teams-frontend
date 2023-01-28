import "./Table.scss";

export default function Table<T>({ columns, values, visibilityObs }: {
  columns: TableColumn<T>[];
  values: T[];
  visibilityObs?: Obs<Set<T>>;
}) {
  const $initRow = getRowInitializer(visibilityObs);

  return (
    <table className="table">
      <thead>
        <tr className="text-white">
          {columns.map((column) => (
            <th>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((value) => (
          <tr $init={(element) => $initRow(element, value)}>
            {columns.map((column) => (
              <td>{column.getRow(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getRowInitializer<T>(obs?: Obs<Set<T>>) {
  return (row: HTMLTableRowElement, value: T) => {
    if (!obs)
      return;

    const emptyText = document.createTextNode("");
    let isHidden = false;

    obs.subscribe((set) => {
      if (set.has(value) && isHidden) {
        isHidden = false;
        emptyText.replaceWith(row);
        return;
      }
      if (!set.has(value) && !isHidden) {
        isHidden = true;
        row.replaceWith(emptyText);
      }
    });
  };
}