// Набір правил, який визначає порядок та особливості передачі інформації це - протокол передачі даних
// Який протокол використовується для передачі довільних даних в Інтернеті як текст? HTTP
// На якій моделі побудовано протокол HTTP? Клієнт-Сервер
// Надбудова над HTTP, в якій повідомлення між клієнтом та сервером шифрується з метою підвищення безпеки... HTTPS
// Виберіть неіснуючий HTTP метод? GRAB
// Для чого у запиті чи у відповіді використовуються HTTP заголовки? Для передачі службової інформації
// Який символ URL ВКАЗУЄ НА ПОЧАТОК СПИСКУ ПАРАМЕТРІВ ЗАПИТУ? ?
// Який символ поділяє параметри запиту? &
// Виберіть неіснуючий формат даних для передачі через мережу? PTD
// Що означає статус 200 у відпвіді від бекенда? Успішна відповідь на HTTP запит
// Що повертає метод fetch()? Проміс
// Код на ілюстрації буде успішним? False
// const getUser = userId => {
//     consturl = `http://my-api.com/users/${userId}`;
//     fetch(url).then(res => res.json());
// };
// getUser(1).then(user => console.log(user));


// https://newsapi.org/v2/everything?q=bitcoin&apiKey=4b23b61645d143729eaa1ff3f7f97664

import API from "./api.js";
// API вместо { getNews }

// console.log(API); 
// API.getNews("gpt-4").then(result => console.log(result));

/*
 1. отримати refs
 2. вішаємо слухач подій на сабміт на форму
 3. отримати запит з інпуту і передати його у вигляді квері параметру на сервер
 4. перевірити відповідь серверу
    4.1. якщо негативна відповідь - інформувати користувача
 5. отримаємо результат та перебираємо масив новин і створюємо з нього розмітку(збираємо одну строку)
 6. показуємо користувачу розмітку (innerHTML)
 7. очистити форму
*/

const refs = {
    form: document.getElementById("form"),
    newsWrapper: document.getElementById("newsWrapper"),
  };

refs.form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.elements.news.value.trim();
  
    if (value === "") alert("No value!");
    else
      API.getNews(value)
        .then(({ articles }) => {
          if (articles.length === 0) throw new Error("No data");
  
          return articles.reduce(
            (markup, article) => markup + createMarkup(article),
            ""
          );
        })
        .then(updateNewsList)
        //   .then(data => console.log(data))
        .catch(onError)
        .finally(() => form.reset());
    //   .catch((err) => onError(err));
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
    refs.newsWrapper.innerHTML = markup;
  }
  
  function onError(err) {
    console.error(err);
    updateNewsList("<p>Not found!</p>");
  }