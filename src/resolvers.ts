import { Resolvers } from "./types"
const resolvers: Resolvers = {
  Query: {
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyApi.getFeaturedPlaylists();
    }
  }
}