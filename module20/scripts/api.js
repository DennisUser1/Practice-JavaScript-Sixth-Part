const URL = "https://newsapi.org/v2/everything";
const API_KEY = "4b23b61645d143729eaa1ff3f7f97664";

function getNews(query, page = 1) {
  return fetch(`${URL}?apiKey=${API_KEY}&q=${query}&searchIn=title&pageSize=6&page=${page}`).then(
    (res) => res.json()
  );
}

export default { getNews };