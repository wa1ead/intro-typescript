const resolvers = {
  Query: {
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyApi.getFeaturedPlaylists();
    }
  }
}