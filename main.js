fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    let books = data;

    // import data from "./data.json" assert { type: "json" };
    // let books = data;

    function renderCards() {
      //-------------- Initial data -----------------
      books.forEach((e) => {
        const title = e.title;
        const autor = e.autor;
        const image = e.image;
        const price = e.price;

        const discount = e.discount;
        const isItFeatured = e.featured;
        const isItBestseller = e.bestseller;
        const isItPromoted = e.promoted;

        const featuredBooks = document.querySelector(".featured-books-wrapper");
        const popularBooks = document.querySelector(".popular-books-wrapper");
        const offerBooks = document.querySelector(".books-offer-wrapper");

        const divEl = document.createElement("div");
        divEl.classList.add("book-card");

        //------------ templates --------------------
        const discountTemplate =
          discount === "0"
            ? `<p class="book-card__price">$ ${price}</p>`
            : `<p class="book-card__price">
        <span class="book-card__old-price">
        <span class="book-card__discount">${discount}% OFF</span>
        $ ${price}</span>$ ${(Math.round((price - price * (discount / 100)) * 100) / 100).toFixed(2)}</p>`;

        const stringToInject = `
    <img class="book-card__image" src="${image}" alt="Book ${title}" />
    <h3 class="book-card__title">${title}</h3>
    <p class="book-card__autor">${autor}</p>
    ${discountTemplate}`;
        divEl.innerHTML = stringToInject;

        if (isItFeatured) {
          featuredBooks.append(divEl);
        }

        if (!isItFeatured && !isItBestseller && !isItPromoted && discount === "0") {
          popularBooks.append(divEl);
        }

        if (!isItBestseller && discount !== "0") {
          offerBooks.append(divEl);
        }
      });
    }
    renderCards();
  });

//-------------- Mobile nav -----------------
const navToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});
