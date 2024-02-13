// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function getCards(name, link) {
  const cardsTemplate = document.querySelector('#card-template').content;

  const cardsElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardsElement.querySelector('.card__image').src = link;
  cardsElement.querySelector('.card__title').textContent = name;

  deleteCards(cardsElement);

  return cardsElement;
};

function deleteCards(cardsElement) {

 const deleteButton = cardsElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    cardsElement.remove();
  });
}

function appCards() {
    const cardsSelector = document.querySelector('.places__list');

    initialCards.forEach(function(card) {
        const newCard = getCards(card.name, card.link);
        cardsSelector.append(newCard);
      });
};

appCards();

