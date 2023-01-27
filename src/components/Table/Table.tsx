import "./Table.scss";

export default function Table<T>({ columns, values }: {
  columns: TableColumn<T>[];
  values: T[];
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
          <tr>
            {columns.map((column) => (
              <td>{column.getRow(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}