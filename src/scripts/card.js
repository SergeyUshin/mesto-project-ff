import { addPopoupImg } from "../index.js";
import { newCardPopup } from "../index.js";
import { closePopup } from "./modal.js";
import { initialCards } from "./cards.js";

function createCardElement(data, onDelete, onLike, onPopup) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardsElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardsElement.querySelector(".card__delete-button");
  const cardsSelector = document.querySelector(".places__list");

  cardsElement.querySelector(".card__image").src = data.link;
  cardsElement.querySelector(".card__image").alt = data.name;
  cardsElement.querySelector(".card__title").textContent = data.name;

  cardsSelector.addEventListener("click", onPopup);
  cardsSelector.addEventListener("click", onLike);
  deleteButton.addEventListener("click", onDelete);
  return cardsElement;
}

function deleteCard(evt) {
  const deleteButton = evt.target.closest(".card");
  deleteButton.remove();
}

function addLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function appCards() {
  const cardsSelector = document.querySelector(".places__list");
  initialCards.forEach(function (cardData) {
    const newCard = createCardElement(
      cardData,
      deleteCard,
      addLike,
      addPopoupImg
    );
    cardsSelector.append(newCard);
  });
}

export function addCardFromForm(evt) {
  evt.preventDefault();

  const newCardName = newCardPopup.querySelector(
    ".popup__input_type_card-name"
  );
  const newCardUrl = newCardPopup.querySelector(".popup__input_type_url");

  const cardName = newCardName.value;
  const cardLink = newCardUrl.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = createCardElement(newCardData, deleteCard);
  const cardsSelector = document.querySelector(".places__list");
  cardsSelector.prepend(newCardElement);

  closePopup(newCardPopup);
}
