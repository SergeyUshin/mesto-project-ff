import { removeCard } from "./api.js";
import { addlikes } from "./api.js";
import { deletelikes } from "./api.js";

export function createCardElement(data, onDelete, onLike, onPopup, userId) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardsElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardsElement.querySelector(".card__delete-button");
  const cardImage = cardsElement.querySelector(".card__image");
  const btnLike = cardsElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardsElement.querySelector(".card__title").textContent = data.name;

  cardImage.addEventListener("click", () => onPopup(data));
  btnLike.addEventListener("click", () => onLike(btnLike, data._id));

  deleteButton.addEventListener("click", () =>
    onDelete(cardsElement, data._id)
  );

  if (data.likes.some((like) => like._id === userId)) {
    btnLike.classList.add("card__like-button_is-active");
  }

  if (data.owner._id === userId) {
    deleteButton.classList.add("card__delete-button_activ");
  }

  return cardsElement;
}

export function deleteCard(cardElement, cardId) {
  removeCard(cardId)
    .then((data) => {
      cardElement.remove();
      console.log("Карточка успешно удалена с сервера:", data);
    })
    .catch((error) => {
      console.log("Произошла ошибка при удалении карточки с сервера:", error);
    });
}

export function addLike(like, cardId) {
  if (like.classList.contains("card__like-button_is-active")) {
    deletelikes(cardId)
      .then(() => {
        like.classList.remove("card__like-button_is-active");

        const counterElement = like.nextElementSibling;
        if (counterElement) {
          const currentCount = parseInt(counterElement.textContent, 10);
          counterElement.textContent = currentCount - 1;
        }
      })
      .catch((error) => {
        console.log("Произошла ошибка при удалении лайка с сервера:", error);
      });
  } else {
    addlikes(cardId)
      .then(() => {
        like.classList.add("card__like-button_is-active");

        const counterElement = like.nextElementSibling;
        if (counterElement) {
          const currentCount = parseInt(counterElement.textContent, 10);
          counterElement.textContent = currentCount + 1;
        }
      })
      .catch((error) => {
        console.log("Произошла ошибка при добавлении лайка на сервер:", error);
      });
  }
}

export function addCounterLike(data) {
  data.forEach((card, i) => {
    const counter = document.querySelectorAll(".counter")[i];
    if (counter) {
      counter.textContent = card.likes.length;
    }
  });
}

export function addBtnDelete(data) {
  const deleteButton = data.querySelector(".card__delete-button");
  if (deleteButton) {
    deleteButton.classList.add("card__delete-button_activ");
  }
}
