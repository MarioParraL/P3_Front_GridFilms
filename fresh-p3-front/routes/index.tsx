import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import MoviesContainer from "../components/MovieContainer.tsx";

type Movie = {
  original_title: string;
  release_date: string;
  backdrop_path: string;
  popularity: number;
};

type Data = {
  movies: Movie[];
  columns: string;
  query: string;
};

export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    const query = name ?? "";
    const columns = url.searchParams.get("columns") ?? "2";
    const API_KEY = Deno.env.get("API_KEY");

    if (name) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error en la API");
        }

        const data = await response.json();

        return ctx.render({ movies: data.results, columns, query });
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    }

    return ctx.render({ movies: [], columns, query });
  },
};

export default (props: PageProps<Data>) => {
  const movies = props.data.movies;

  return (
    <div>
      <form class="formulario" method="get">
        <input
          class="input"
          type="text"
          name="name"
          value={props.data.query}
          placeholder="Buscador"
          required
        />
        <button class="boton-buscar" type="submit">
          <img src="lupa.png" />
        </button>
      </form>
      <div class="botones">
        <a href={`/?name=${props.data.query}&columns=1`}>1</a>
        <a href={`/?name=${props.data.query}&columns=2`}>2</a>
        <a href={`/?name=${props.data.query}&columns=3`}>3</a>
        <a href={`/?name=${props.data.query}&columns=4`}>4</a>
        <a href={`/?name=${props.data.query}&columns=5`}>5</a>
      </div>
      <MoviesContainer movies={movies} columns={props.data.columns} />
    </div>
  );
};
