import fetch from "node-fetch";
import { parse } from "node-html-parser";

const CSS_SELECTOR = "div.profile-top-rating-data.profile-top-rating-data_gray span.profile-top-rating-dataDesc";

async function fetchPage(id: number | string): Promise<string> {
  const response = await fetch(`https://ratings.fide.com/profile/${id}`);
  return await response.text();
}

function getRating(html: string): number {
  const ratingStr = parse(html)
    .querySelector(CSS_SELECTOR)
    ?.nextSibling
    .textContent
    .trim();
  return parseFloat(ratingStr as string) || 0;
}

export async function getRatingById(id: number | string): Promise<number> {
  return getRating(await fetchPage(id));
}