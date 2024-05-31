const URL = "https://newsapi.org/v2/everything";
const API_KEY = "4b23b61645d143729eaa1ff3f7f97664";

export default class NewsService {
  constructor() {
    this.page = 1;
    this.searchQuery = "";
  }

  getNews() {
    return fetch(
      `${URL}?apiKey=${API_KEY}&q=${this.searchQuery}&searchIn=title&pageSize=6&page=${this.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        // if (data.status === "error") throw new Error("The end");
        this.incrementPage();
        return data.articles;
      });
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}