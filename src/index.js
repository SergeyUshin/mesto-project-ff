import "./pages/index.css";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
import { addLike } from "./scripts/card.js";
import { deleteCard } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { createCardElement } from "./scripts/card.js";
import { closeOverlau } from "./scripts/modal.js";

const profelOpenList = document.querySelector(".profile__edit-button");
const newCardOpenList = document.querySelector(".profile__add-button");
const closedModalList = document.querySelectorAll(".popup__close");
const imgOpenList = document.querySelector(".popup_type_image");
const popupImgList = imgOpenList.querySelector(".popup__image");
const popupCaptionList = imgOpenList.querySelector(".popup__caption");
const newCardPopupList = document.querySelector(".popup_type_new-card");
const newCardNameList = newCardPopupList.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlList = newCardPopupList.querySelector(".popup__input_type_url");
const cardsSelectorList = document.querySelector(".places__list");
const popupList = document.querySelectorAll(".popup");
const profelPopupList = document.querySelector(".popup_type_edit");
const nameInputList = profelPopupList.querySelector(".popup__input_type_name");
const descriptionInputList = profelPopupList.querySelector(
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
    cardsSelectorList.append(newCard);
  });
}

function addCardFromForm(evt) {
  evt.preventDefault();

  const cardName = newCardNameList.value;
  const cardLink = newCardUrlList.value;

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
  cardsSelectorList.prepend(newCardElement);

  closePopup(newCardPopupList);

  newCardNameList.value = "";
  newCardUrlList.value = "";
}

appCards();
addPopup(profelPopupList, profelOpenList);
addPopup(newCardPopupList, newCardOpenList);

closedModalList.forEach(function (button) {
  const popupClos = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popupClos);
  });
});

popupList.forEach(function (over) {
  over.addEventListener("mousedown", closeOverlau);
});

function addPopup(name, btn) {
  nameInputList.value = titleList.textContent;
  descriptionInputList.value = descriptionList.textContent;

  btn.addEventListener("click", function () {
    openPopup(name);
  });
}

function createInfoProfel(evt) {
  evt.preventDefault();

  titleList.textContent = nameInputList.value;
  descriptionList.textContent = descriptionInputList.value;

  closePopup(profelPopupList);
}

profelPopupList.addEventListener("submit", createInfoProfel);

newCardPopupList.addEventListener("submit", addCardFromForm);

function addPopoupImg(data) {
  const imageUrl = data.link;
  const imageCaption = data.name;

  popupImgList.src = imageUrl;
  popupImgList.alt = imageCaption;
  popupCaptionList.textContent = imageCaption;

  openPopup(imgOpenList);
}
