import { artistProfiles } from "./artist-profiles";
import type { Media } from "./site";

export const tattooArtists = [
  artistProfiles["old-school"],
  artistProfiles["fine-line"],
  artistProfiles.franja,
  artistProfiles.doni,
];

export const tattooWorks: Media[] = tattooArtists.flatMap((artist) =>
  (artist.works ?? []).map((work) => ({ ...work, author: { name: artist.name, path: artist.path } })),
);
