// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCardElement(name, link, onDelete) {
  const cardsTemplate = document.querySelector("#card-template").content;

  const cardsElement = cardsTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardsElement.querySelector(".card__delete-button");

  cardsElement.querySelector(".card__image").src = link;
  cardsElement.querySelector(".card__image").alt = name;
  cardsElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", onDelete);
  return cardsElement;
}

function deleteCard(evt) {
  const deleteButton = evt.target.closest(".card");
  deleteButton.remove();
}

function appCards() {
  const cardsSelector = document.querySelector(".places__list");

  initialCards.forEach(function (card) {
    const newCard = createCardElement(card.name, card.link, deleteCard);
    cardsSelector.append(newCard);
  });
}

appCards();
