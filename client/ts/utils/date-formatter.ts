const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short"
});

export default function formatDate(dateStr: string): string {
  return dateFormatter.format(new Date(dateStr));
}