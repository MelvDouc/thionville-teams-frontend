export default function Link({ href, setUrl, children }: {
  href: string;
  setUrl: (url: string) => void;
  children?: (Node | string)[];
}) {
  return (
    <a href={href} onclick={(e) => {
      e.preventDefault();
      setUrl(href);
    }}>{children}</a>
  );
}