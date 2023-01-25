import fetch from "node-fetch";

const regex = /<div class="profile-top-rating-data profile-top-rating-data_gray">\s*<span class="profile-top-rating-dataDesc">std<\/span>\s*(\d+)/;

export async function getRatingById(id: number | string): Promise<number> {
  const response = await fetch(`https://ratings.fide.com/profile/${id}`);
  const html = await response.text();
  const match = html.match(regex);
  if (match)
    return parseInt(match[1]);
  return 0;
}