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
  Mutation: {
    addItemsToPlaylist: async (_, { input }, { dataSources }) => {
      try {
        const response = await dataSources.SpotifyAPI.addItemsToPlaylist(input)
        if (response.snaphot_id)
        // everything succeeds with the mutation
        {
          return {
            code: 200,
            success: true,
            message: "Tracks added to playlist!",
            playlistId: response.snapshot_id
          }
        } else {
          throw Error("snapshot_id property not found");
        }
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err}`,
          playlistId: null,
        };
      }
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
    AddItemsToPlaylistPayload: {
      playlist: ({ playlistId }, _, { dataSources }) => {
        return dataSources.spotifyAPI.getPlaylist(playlistId);
      },
    },
  },
};