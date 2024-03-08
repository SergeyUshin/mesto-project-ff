// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { appCards } from "./scripts/card.js";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
import { addPopup } from "./scripts/modal.js";
import { addCardFromForm } from "./scripts/card.js";

const profelOpen = document.querySelector(".profile__edit-button");
const profelPopup = document.querySelector(".popup_type_edit");
export const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardOpen = document.querySelector(".profile__add-button");
const closedModal = document.querySelectorAll(".popup__close");
const nameInput = profelPopup.querySelector(".popup__input_type_name");
const descriptionInput = profelPopup.querySelector(
  ".popup__input_type_description"
);
const title = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

appCards();
addPopup(profelPopup, profelOpen);
addPopup(newCardPopup, newCardOpen);

closedModal.forEach(function (evt) {
  const popup = evt.closest(".popup");
  evt.addEventListener("click", function () {
    closePopup(popup);
  });
});

function createInfoProfel(evt) {
  evt.preventDefault();

  title.textContent = nameInput.value;
  description.textContent = descriptionInput.value;

  closePopup(profelPopup);
}
function addPopupProfel() {
  nameInput.value = title.textContent;
  descriptionInput.value = description.textContent;
  profelPopup.addEventListener("submit", createInfoProfel);
}

addPopupProfel();

newCardPopup.addEventListener("submit", addCardFromForm);

export function addPopoupImg(evt) {
  const imgOpen = document.querySelector(".popup_type_image");
  const popupImg = imgOpen.querySelector(".popup__image");
  const popupCaption = imgOpen.querySelector(".popup__caption");

  if (evt.target.classList.contains("card__image")) {
    const imageUrl = evt.target.src;
    const imageCaption = evt.target.alt;

    popupImg.src = imageUrl;
    popupImg.alt = imageCaption;
    popupCaption.textContent = imageCaption;

    openPopup(imgOpen);
  }
}
