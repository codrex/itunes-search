import { formatMusicSearch } from "../formatter";

describe("formatter", () => {
  it("should format artist data type", () => {
    const payload = {
      artistName: "",
      artistType: "",
      kind: "",
      collectionName: "",
      collectionType: "",
      artworkUrl100: "",
      wrapperType: "artist",
      primaryGenreName: "",
      trackName: "",
      trackId: "",
      collectionId: "",
      artistId: "artist id",
    };
    expect(formatMusicSearch(payload as any)).toMatchSnapshot()
  });

  it("should format collection data type", () => {
    const payload = {
      artistName: "",
      artistType: "",
      kind: "",
      collectionName: "",
      collectionType: "",
      artworkUrl100: "",
      wrapperType: "collection",
      primaryGenreName: "",
      trackName: "",
      trackId: "",
      collectionId: "collection id",
      artistId: "",
    };
    expect(formatMusicSearch(payload as any)).toMatchSnapshot()
  });

  it("should format track data type", () => {
    const payload = {
      artistName: "",
      artistType: "",
      kind: "",
      collectionName: "",
      collectionType: "",
      artworkUrl100: "",
      wrapperType: "track",
      primaryGenreName: "",
      trackName: "",
      trackId: "track id",
      collectionId: "",
      artistId: "",
    };
    expect(formatMusicSearch(payload as any)).toMatchSnapshot()
  });
});
