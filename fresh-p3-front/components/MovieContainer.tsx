import { FunctionComponent } from "preact/src/index.d.ts";
import MovieCard from "./Movie.tsx";

type Movie = {
  original_title: string;
  release_date: string;
  backdrop_path: string;
  popularity: number;
};

type Props = {
  movies: Movie[];
  columns: string;
};

const MoviesContainer: FunctionComponent<Props> = ({ movies, columns }) => {
  return (
    <>
      <div className={"moviesContainer" + columns}>
        {movies.map((m) => <MovieCard movie={m} />)}
      </div>
    </>
  );
};

export default MoviesContainer;
