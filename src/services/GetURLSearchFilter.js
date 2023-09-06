export const GetURLSearchFilter = (searchFromURL, filter) => {
  //Get all the filter options backend requires from url
  const searchParams = new URLSearchParams(searchFromURL);
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";

  //Get all the filter options backend requires from filter object

  const filterPage = filter.page || page;
  let filterQuery = filter.query || query;
  const filterGenre = filter.genre || genre;

  if (filter.query === "" && query.length === 1) {
    filterQuery = "";
  }

  //const filterOrder = filter.order || order;

  let link = "";

  if (!filterQuery && !filterGenre) {
    link = "/search";
    return link;
  }

  if (!filterQuery) {
    link = `/search?genre=${filterGenre}&page=${filterPage}`;
    return link;
  }

  if (!filterGenre) {
    link = `/search?query=${filterQuery}&page=${filterPage}`;
    return link;
  }
  link = `/search?genre=${filterGenre}&page=${filterPage}&query=${filterQuery}`;
  return link;
};
