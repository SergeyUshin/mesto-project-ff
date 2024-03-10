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
  btnLike.addEventListener("click", () => onLike(btnLike));

  deleteButton.addEventListener("click", () => onDelete(cardsElement));
  return cardsElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function addLike(like) {
  like.classList.toggle("card__like-button_is-active");
}
