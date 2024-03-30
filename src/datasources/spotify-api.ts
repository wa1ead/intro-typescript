import { RESTDataSource } from '@apollo/datasource-rest'

export class SpotifyApi extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

  async getFeaturedPlaylists() {
    const response = await this.get<{
      playlists: { items: any[] }
    }>('browse/featured-playlists')
    return response?.playlists?.items ?? []
  }
}
