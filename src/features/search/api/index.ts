import { config } from "../../../config";

export async function itunesMusicSearch(
  term: string,
  limit: number,
  country: string
) {
  const query = new URLSearchParams({
    term,
    limit: String(limit),
    country,
    media: "music",
  }).toString();

  const response = await fetch(`${config.baseApiUrl}/search?${query}`);

  return await response.json();
}
