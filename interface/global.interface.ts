export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}


export default interface MovieInterface{

    movies:Array<Movie>
}

export interface MovieCardInterface {
  id: number;
  title: string;
  rating: number;
  releaseYear: string;
  poster: string;
}