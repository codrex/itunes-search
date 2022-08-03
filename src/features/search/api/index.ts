import { config } from "../../../config";
import { SearchResponsePayload } from "../../types";

export async function searchApi({
  term,
  limit,
  country,
}: {
  term: string;
  limit: number;
  country: string;
}) {
  const query = new URLSearchParams({
    term,
    limit: String(limit),
    country,
    media: "music",
    entity: "musicArtist, album, song",
  }).toString();

  const response = await fetch(`${config.baseApiUrl}/search?${query}`);

  return (await response.json()) as SearchResponsePayload;
}
