import "./pages/index.css";
import { getInitialCards } from "./scripts/api.js";
import { receiveDataUser } from "./scripts/api.js";
import { replaceDataUser } from "./scripts/api.js";
import { addNewCard } from "./scripts/api.js";
import { addNewAvatar } from "./scripts/api.js";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
import { createCardElement } from "./scripts/card.js";
import { closeOverlau } from "./scripts/modal.js";
import { configSeting } from "./scripts/validation.js";
import { enableValidation } from "./scripts/validation.js";
import { clearValidation } from "./scripts/validation.js";

const buttonOpenProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");
const buttonsClosePopup = document.querySelectorAll(".popup__close");
const popupTupeImg = document.querySelector(".popup_type_image");
const popupImg = popupTupeImg.querySelector(".popup__image");
const popupCaption = popupTupeImg.querySelector(".popup__caption");
const popupTupeNewCard = document.querySelector(".popup_type_new-card");
const inputFillNameNewCard = popupTupeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputFillUrlNewCard = popupTupeNewCard.querySelector(
  ".popup__input_type_url"
);
const cardsSelector = document.querySelector(".places__list");
const popupList = document.querySelectorAll(".popup");
const profelPopup = document.querySelector(".popup_type_edit");
const inputFillNeme = profelPopup.querySelector(".popup__input_type_name");
const inputFillDescription = profelPopup.querySelector(
  ".popup__input_type_description"
);
const titleList = document.querySelector(".profile__title");
const descriptionList = document.querySelector(".profile__description");
const buttonOpenAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_new_avatar");
const inputFillUrlAvatar = popupAvatar.querySelector(
  ".popup__input_new-avatar"
);
let userId;

function downloadDataServer() {
  Promise.all([getInitialCards(), receiveDataUser()])
    .then(([cards, user]) => {
      userId = user._id;

      cards.forEach((cardData) => {
        const newCard = createCardElement(cardData, addPopoupImg, userId);
        cardsSelector.append(newCard);
      });

      buttonOpenAvatar.style.backgroundImage = `url(${user.avatar})`;
      titleList.textContent = user.name;
      descriptionList.textContent = user.about;
    })
    .catch((error) => {
      console.log("Произошла ошибка при загрузке данных:", error);
    });
}

function addCardFromForm(evt) {
  evt.preventDefault();

  const cardName = inputFillNameNewCard.value;
  const cardLink = inputFillUrlNewCard.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };
  renderLoading(popupTupeNewCard, true);
  addNewCard(newCardData)
    .then((data) => {
      const newCardElement = createCardElement(data, addPopoupImg, userId);

      cardsSelector.prepend(newCardElement);

      closePopup(popupTupeNewCard);
    })

    .catch((error) => {
      console.error(error);
    })

    .finally(() => {
      renderLoading(popupTupeNewCard, false);
    });
}

downloadDataServer();

buttonsClosePopup.forEach(function (button) {
  const popupClos = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popupClos);
  });
});

popupList.forEach(function (over) {
  over.addEventListener("mousedown", closeOverlau);
});

function openPopupProfel() {
  inputFillNeme.value = titleList.textContent;
  inputFillDescription.value = descriptionList.textContent;

  clearValidation(profelPopup, configSeting);

  openPopup(profelPopup);
}

function openPopupNewCard() {
  inputFillNameNewCard.value = "";
  inputFillUrlNewCard.value = "";

  clearValidation(popupTupeNewCard, configSeting);

  openPopup(popupTupeNewCard);
}

function openPopupNewAvatar() {
  inputFillUrlAvatar.value = "";

  clearValidation(popupAvatar, configSeting);

  openPopup(popupAvatar);
}

buttonOpenAvatar.addEventListener("click", openPopupNewAvatar);
buttonOpenNewCard.addEventListener("click", openPopupNewCard);
buttonOpenProfile.addEventListener("click", openPopupProfel);

function updateProfileInformation(evt) {
  evt.preventDefault();
  const name = inputFillNeme.value;
  const about = inputFillDescription.value;

  const userData = {
    name: name,
    about: about,
  };

  renderLoading(profelPopup, true);
  replaceDataUser(userData)
    .then((data) => {
      titleList.textContent = data.name;
      descriptionList.textContent = data.about;
      closePopup(profelPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(profelPopup, false);
    });
}

function updateAvatar(evt) {
  evt.preventDefault();

  const avatarLink = inputFillUrlAvatar.value;

  renderLoading(popupAvatar, true);
  addNewAvatar({ avatar: avatarLink })
    .then((data) => {
      buttonOpenAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((error) => {
      console.error("Произошла ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(popupAvatar, false);
    });
}

popupAvatar.addEventListener("submit", updateAvatar);

profelPopup.addEventListener("submit", updateProfileInformation);

popupTupeNewCard.addEventListener("submit", addCardFromForm);

function addPopoupImg(data) {
  popupImg.src = data.link;
  popupImg.alt = data.name;
  popupCaption.textContent = data.name;

  openPopup(popupTupeImg);
}

enableValidation(configSeting);

function renderLoading(popup, isLoading) {
  const btnPopup = popup.querySelector(".popup__button");

  if (isLoading) {
    btnPopup.textContent = "Сохранение...";
  } else {
    btnPopup.textContent = "Сохранить";
  }
}
