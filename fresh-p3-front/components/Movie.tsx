import { FunctionComponent } from "preact/src/index.d.ts";

type Props = {
  movie: {
    original_title: string;
    release_date: string;
    backdrop_path: string;
    popularity: number;
  };
};

const MovieCard: FunctionComponent<Props> = (props) => {
  const { original_title, release_date, backdrop_path, popularity } =
    props.movie;
  return (
    <div class="movieCard">
      <img
        class="poster"
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt={original_title}
      />

      <h2>{original_title}</h2>
      <p>{release_date}</p>
      <div class="barra">
        <div class="relleno" style={{ width: `${popularity * 10}%` }}></div>
      </div>
    </div>
  );
};

export default MovieCard;
