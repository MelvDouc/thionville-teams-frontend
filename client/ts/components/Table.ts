import { ElementDescriptor, TableColumn } from "../types.js";
import { createElement } from "../utils/create-element.js";

export default function Table<T>(columns: TableColumn<T>[], values: T[]) {
  const headRow: ElementDescriptor<"tr"> = {
    tagName: "tr",
    children: columns.map(({ header }) => ({
      tagName: "th",
      properties: { innerText: header }
    }))
  };

  const bodyRows = values.map((value) => ({
    tagName: "tr",
    children: columns.map(({ getRow }) => ({
      tagName: "td",
      properties: { innerText: getRow(value) }
    }))
  }));

  return createElement({
    tagName: "table",
    properties: { className: "table" },
    children: [
      {
        tagName: "thead",
        children: [headRow]
      },
      {
        tagName: "tbody",
        children: bodyRows
      }
    ]
  });
}