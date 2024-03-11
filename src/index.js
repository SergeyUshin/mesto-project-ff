import "./pages/index.css";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
import { addLike } from "./scripts/card.js";
import { deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { createCardElement } from "./scripts/card.js";
import { closeOverlau } from "./scripts/modal.js";

const profelOpen = document.querySelector(".profile__edit-button");
const newCardOpen = document.querySelector(".profile__add-button");
const buttonClosedModal = document.querySelectorAll(".popup__close");
const imgOpen = document.querySelector(".popup_type_image");
const popupImg = imgOpen.querySelector(".popup__image");
const popupCaption = imgOpen.querySelector(".popup__caption");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardName = newCardPopup.querySelector(".popup__input_type_card-name");
const newCardUrl = newCardPopup.querySelector(".popup__input_type_url");
const cardsSelector = document.querySelector(".places__list");
const popup = document.querySelectorAll(".popup");
const profelPopup = document.querySelector(".popup_type_edit");
const nameInput = profelPopup.querySelector(".popup__input_type_name");
const descriptionInput = profelPopup.querySelector(
  ".popup__input_type_description"
);
const titleList = document.querySelector(".profile__title");
const descriptionList = document.querySelector(".profile__description");

function appCards() {
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

function addCardFromForm(evt) {
  evt.preventDefault();

  const cardName = newCardName.value;
  const cardLink = newCardUrl.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = createCardElement(
    newCardData,
    deleteCard,
    addLike,
    addPopoupImg
  );
  cardsSelector.prepend(newCardElement);

  closePopup(newCardPopup);
}

appCards();

buttonClosedModal.forEach(function (button) {
  const popupClos = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popupClos);
  });
});

popup.forEach(function (over) {
  over.addEventListener("mousedown", closeOverlau);
});

function addPopupProfel() {
  nameInput.value = titleList.textContent;
  descriptionInput.value = descriptionList.textContent;

  openPopup(profelPopup);
}

function addPopupNewCard() {
  newCardName.value = "";
  newCardUrl.value = "";

  openPopup(newCardPopup);
}

newCardOpen.addEventListener("click", addPopupNewCard);
profelOpen.addEventListener("click", addPopupProfel);

function createInfoProfel(evt) {
  evt.preventDefault();

  titleList.textContent = nameInput.value;
  descriptionList.textContent = descriptionInput.value;

  closePopup(profelPopup);
}

profelPopup.addEventListener("submit", createInfoProfel);

newCardPopup.addEventListener("submit", addCardFromForm);

function addPopoupImg(data) {
  popupImg.src = data.link;
  popupImg.alt = data.name;
  popupCaption.textContent = data.name;

  openPopup(imgOpen);
}
