import router from "../../utils/router.js";

export default function Link({ href, children }: {
  href: string;
  children?: (Node | string)[];
}) {
  return (
    <a href={href} onclick={(e) => {
      e.preventDefault();
      router.setUrl(href);
    }}>{children}</a>
  );
}