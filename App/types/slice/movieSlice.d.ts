export interface IMoviesRequest {
  page?: number
}

export interface IMoviesResponse {
  dates: IMoviesDates
  page: number
  results: IMoviesResult[]
  total_pages: number
  total_results: number
}

export interface IMoviesDates {
  maximum: string
  minimum: string
}

export interface IMoviesResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
