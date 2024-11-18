import { IMovie } from "./IMovie";

export interface IMovieListProps {
    title?: string; 
    movies: IMovie[];
    isLoading?: boolean;
    onSeeAllPress?: () => void;
    onMoviePress?: (movieId: number) => void;
  }