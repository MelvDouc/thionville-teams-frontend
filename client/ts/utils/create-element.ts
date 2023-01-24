import { ElementDescriptor } from "../types.js";

export function createElement<K extends keyof HTMLElementTagNameMap>({
  tagName,
  properties,
  $init,
  children
}: ElementDescriptor<K>): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (properties)
    Object.assign(element, properties);
  if ($init)
    $init(element);
  if (children)
    element.append(...createElements(children));
  return element;
}

export function createElements<K extends keyof HTMLElementTagNameMap>(elementDescriptors: ElementDescriptor<K>[]): HTMLElementTagNameMap[K][] {
  return elementDescriptors.map(createElement);
}