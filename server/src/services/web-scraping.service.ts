import fetch from "node-fetch";

const regex = /<div class="profile-top-rating-data profile-top-rating-data_gray">\s*<span class="profile-top-rating-dataDesc">std<\/span>\s*(\d+)/;

async function fetchPage(id: number | string): Promise<string> {
  console.log(id);
  const response = await fetch(`https://ratings.fide.com/profile/${id}`);
  return await response.text();
}

function getRating(html: string): number {
  const match = html.match(regex);
  if (match)
    return parseInt(match[1]);
  return 0;
}

export async function getRatingById(id: number | string): Promise<number> {
  return getRating(await fetchPage(id));
}