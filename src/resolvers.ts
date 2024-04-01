import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
    playlist: (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(id);
    },
  },
  Playlist: {
    tracks: ({ tracks }) => {
      const { items = [] } = tracks;
      return items.map(({ track }) => track);
    }
  },
  Track: {
    durationMs: (parent) => parent.duration_ms
  },
};