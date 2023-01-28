import "./Table.scss";

export default function Table<T>({ columns, values, visibilityObs }: {
  columns: TableColumn<T>[];
  values: T[];
  visibilityObs?: Obs<Set<T>>;
}) {
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
          <tr $init={(element) => {
            if (visibilityObs) {
              visibilityObs.subscribe((set) => {
                set.has(value)
                  ? element.classList.remove("hidden")
                  : element.classList.add("hidden");
              });
            }
          }}>
            {columns.map((column) => (
              <td>{column.getRow(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}