import "./pages/index.css";
import { getInitialCards } from "./scripts/api.js";
import { userList } from "./scripts/api.js";
import { user } from "./scripts/api.js";
import { addNewCard } from "./scripts/api.js";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
import { addLike } from "./scripts/card.js";
import { deleteCard } from "./scripts/card.js";
import { createCardElement } from "./scripts/card.js";
import { closeOverlau } from "./scripts/modal.js";
import { configSeting } from "./scripts/validation.js";
import { enableValidation } from "./scripts/validation.js";
import { clearValidation } from "./scripts/validation.js";

const profelOpen = document.querySelector(".profile__edit-button");
const newCardOpen = document.querySelector(".profile__add-button");
const ClosedModalList = document.querySelectorAll(".popup__close");
const imgOpen = document.querySelector(".popup_type_image");
const popupImg = imgOpen.querySelector(".popup__image");
const popupCaption = imgOpen.querySelector(".popup__caption");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardName = newCardPopup.querySelector(".popup__input_type_card-name");
const newCardUrl = newCardPopup.querySelector(".popup__input_type_url");
const cardsSelector = document.querySelector(".places__list");
const popupList = document.querySelectorAll(".popup");
const profelPopup = document.querySelector(".popup_type_edit");
const nameInput = profelPopup.querySelector(".popup__input_type_name");
const descriptionInput = profelPopup.querySelector(
  ".popup__input_type_description"
);
const titleList = document.querySelector(".profile__title");
const descriptionList = document.querySelector(".profile__description");

function appDataServer() {
  Promise.all([getInitialCards(), userList()])
    .then(([cards, users]) => {
      cards.forEach((cardData) => {
        const newCard = createCardElement(
          cardData,
          deleteCard,
          addLike,
          addPopoupImg
        );

        if (cardData.likes.some((like) => like._id === users._id)) {
          const likeButton = newCard.querySelector('.card__like-button');
          if (likeButton) {
            likeButton.classList.add('card__like-button_is-active');
          }
        }

        if (cardData.owner._id === users._id) {
          const deleteButton = newCard.querySelector('.card__delete-button');
          if (deleteButton) {
            deleteButton.classList.add('card__delete-button_activ');
          }
        }

        cardsSelector.append(newCard);
      });


      
      titleList.textContent = users.name;
      descriptionList.textContent = users.about;
    })
    .catch((error) => {
      console.log("Произошла ошибка при загрузке данных:", error);
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
  addNewCard(newCardData)
    .then((data) => {
      const newCardElement = createCardElement(
        data,
        deleteCard,
        addLike,
        addPopoupImg
      );
      cardsSelector.prepend(newCardElement);

      closePopup(newCardPopup);
    })
    
    .catch((error) => {
      console.error(error);
    });
}

appDataServer();

ClosedModalList.forEach(function (button) {
  const popupClos = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popupClos);
  });
});

popupList.forEach(function (over) {
  over.addEventListener("mousedown", closeOverlau);
});

function addPopupProfel() {
  nameInput.value = titleList.textContent;
  descriptionInput.value = descriptionList.textContent;

  clearValidation(profelPopup, configSeting);

  openPopup(profelPopup);
}

function addPopupNewCard() {
  newCardName.value = "";
  newCardUrl.value = "";

  clearValidation(newCardPopup, configSeting);

  openPopup(newCardPopup);
}

newCardOpen.addEventListener("click", addPopupNewCard);
profelOpen.addEventListener("click", addPopupProfel);

function createInfoProfel(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = descriptionInput.value;

  const userData = {
    name: name,
    about: about,
  };

  user(userData)
    .then((data) => {
      titleList.textContent = data.name;
      descriptionList.textContent = data.about;
      closePopup(profelPopup);
    })
    .catch((error) => {
      console.error(error);
    });
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

enableValidation(configSeting);
