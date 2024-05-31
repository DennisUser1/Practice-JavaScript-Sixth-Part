// Що буде виведено в консоль браузера, якщо  статус коду відповіді сервера 404? "Error"
// fetch("https://my-api.com").then(response => {
//     if(response.ok) {
//         return console.log("Ok");
//     }
//     console.log("Not Ok");
// })
// .catch(() => console.log("Error"));
// Виберіть неправильне твердження переваги пагінації. Підвищення SEO ВЕБ-СТОРІНКИ.
// Де вказується значення пагінації для бекенда при HTTP ЗАПИТІ? у ПАРАМЕТРАХ ЗАПИТУ
// Які параметри зазвичай надає бекенд для керування пагінацією? Номер групи та кількість елементів у групі
// Як при пагінації дізнатися, коли настане кінець колекції? Бекенд повертає необхідні дані

import NewsService from "./NewsService.js";
import LoadMoreBtn from "./components/LoadMoreBtn.js";

const refs = {
  form: document.getElementById("form"),
  newsWrapper: document.getElementById("newsWrapper"),
};

const newsService = new NewsService();
const loadMoreBtn = new LoadMoreBtn({
  selector: "#loadMore",
  isHidden: true,
});

refs.form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", fetchArticles);

function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.elements.news.value.trim();
  
    if (value === "") alert("No value!");
    else {
      newsService.searchQuery = value;
      newsService.resetPage();
  
      loadMoreBtn.show();
      clearNewsList();
      fetchArticles().finally(() => form.reset());
    }
  }
  
  function fetchArticles() {
    loadMoreBtn.disable();
  
    return getArticlesMarkup().then(() => loadMoreBtn.enable());
  }
  
  function getArticlesMarkup() {
    return newsService
      .getNews()
      .then((articles) => {
        if (!articles) {
          loadMoreBtn.hide();
          return "";
        }
        if (articles.length === 0) throw new Error("No data");
  
        return articles.reduce(
          (markup, article) => markup + createMarkup(article),
          ""
        );
      })
      .then(updateNewsList)
      .catch(onError);
  }
  
  function createMarkup({ title, author, description, url, urlToImage }) {
    return `
    <div class="article-card">
      <h2 class="article-title">${title}</h2>
      <h3 class="article-author">${author || "Unknown"}</h3>
      <img src=${
        urlToImage ||
        "https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      } class="article-img" alt=${title}>
      <p class="article-description">${description}</p>
      <a href=${url} target="_blank" class="article-link">Read more</a>
    </div>`;
  }
  
  function updateNewsList(markup) {
    refs.newsWrapper.insertAdjacentHTML("beforeend", markup);
  }
  
  function clearNewsList() {
    refs.newsWrapper.innerHTML = "";
  }
  
  function onError(err) {
    console.error(err);
    loadMoreBtn.hide();
    refs.newsWrapper.innerHTML = "<p>Not found!</p>";
  }
  
  //! Infinite scroll
  // function handleScroll() {
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  //   if (scrollTop + clientHeight >= scrollHeight - 5) {
  //     fetchArticles();
  //   }
  // }
  
  // window.addEventListener("scroll", handleScroll);