import { removeCard } from "./api.js";
import { addlikes } from "./api.js";
import { deletelikes } from "./api.js";

export function createCardElement(data, onPopup, userId) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardsElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardsElement.querySelector(".card__delete-button");
  const cardImage = cardsElement.querySelector(".card__image");
  const buttonLike = cardsElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardsElement.querySelector(".card__title").textContent = data.name;

  cardImage.addEventListener("click", () => onPopup(data));
  buttonLike.addEventListener("click", () =>
    addLike(buttonLike, data._id, cardsElement)
  );

  buttonDelete.addEventListener("click", () =>
    deleteCard(cardsElement, data._id)
  );

  if (data.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  if (data.owner._id === userId) {
    buttonDelete.classList.add("card__delete-button_activ");
  }

  addCounterLike(cardsElement, data);

  return cardsElement;
}

function deleteCard(cardElement, cardId) {
  removeCard(cardId)
    .then((data) => {
      cardElement.remove();
      console.log("Карточка успешно удалена с сервера:", data);
    })
    .catch((error) => {
      console.log("Произошла ошибка при удалении карточки с сервера:", error);
    });
}

function addLike(like, cardId, element) {
  if (like.classList.contains("card__like-button_is-active")) {
    deletelikes(cardId)
      .then((res) => {
        like.classList.remove("card__like-button_is-active");
        addCounterLike(element, res);
      })
      .catch((error) => {
        console.log("Произошла ошибка при удалении лайка с сервера:", error);
      });
  } else {
    addlikes(cardId)
      .then((res) => {
        like.classList.add("card__like-button_is-active");
        addCounterLike(element, res);
      })
      .catch((error) => {
        console.log("Произошла ошибка при добавлении лайка на сервер:", error);
      });
  }
}

function addCounterLike(element, card) {
  const counter = element.querySelector(".counter");
  if (counter) {
    counter.textContent = card.likes.length;
  }
}
