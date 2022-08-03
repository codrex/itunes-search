import { SearchResponsePayload } from "../../types";

export type FormattedMusicSearch = ReturnType<typeof formatMusicSearch>;

export const formatMusicSearch = (
  data: SearchResponsePayload["results"][number]
) => {
  const {
    artistName,
    artistType,
    kind,
    collectionName,
    collectionType,
    artworkUrl100,
    wrapperType,
    primaryGenreName,
    trackName,
    trackId,
    collectionId,
    artistId,
  } = data;
  switch (wrapperType) {
    case "artist":
      return {
        id: artistId,
        image: `https://ui-avatars.com/api/?size=300&name=${artistName}`,
        type: artistType,
        name: artistName,
        genre: primaryGenreName,
      };
    case "collection":
      return {
        id: collectionId,
        image: artworkUrl100,
        type: collectionType,
        name: collectionName,
        genre: primaryGenreName,
      };
    case "track":
      return {
        id: trackId,
        image: artworkUrl100,
        type: kind,
        name: trackName,
        genre: primaryGenreName,
      };
    default:
      return undefined;
  }
};
