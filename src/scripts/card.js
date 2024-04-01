import { getInitialCards } from "./api.js";
import { removeCard } from "./api.js";
import { addlikes } from "./api.js";
import { deletelikes } from "./api.js";

export function createCardElement(data, onDelete, onLike, onPopup) {
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

  addCounterLike();

  return cardsElement;
}

function deleteCardFromServer(cardId) {
  removeCard(cardId)
    .then((data) => {
      console.log("Карточка успешно удалена с сервера:", data);
    })
    .catch((error) => {
      console.log("Произошла ошибка при удалении карточки с сервера:", error);
    });
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId);

  cardElement.remove();
}

export function addLike(like, cardId) {
  if (like.classList.contains("card__like-button_is-active")) {
    deletelikes(cardId)
      .then(() => {
        like.classList.remove("card__like-button_is-active");
        addCounterLike();
      })
      .catch((error) => {
        console.log("Произошла ошибка при удалении лайка с сервера:", error);
      });
  } else {
    addlikes(cardId)
      .then(() => {
        like.classList.add("card__like-button_is-active");
        addCounterLike();
      })
      .catch((error) => {
        console.log("Произошла ошибка при добавлении лайка на сервер:", error);
      });
  }
}

function addCounterLike() {
  getInitialCards().then((data) => {
    data.forEach((card, i) => {
      const counter = document.querySelectorAll(".counter")[i];
      if (counter) {
        counter.textContent = card.likes.length;
      }
    });
  });
}
