const cardsList = document.querySelector('.places__list');

const createCard = (cardName, cardLink, deleteHandler) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardDescriptionTitle = cardItem.querySelector('.card__title');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');

    cardImage.alt = cardName;
    cardImage.src = cardLink;
    cardDescriptionTitle.textContent = cardName;

    cardDeleteButton.addEventListener('click', () => { deleteHandler(cardItem); });

    return cardItem;
}

const deleteCard = (cardItem) => { cardItem.remove(); }

initialCards.forEach((initialCard) => {
    const newCard = createCard(initialCard.name, initialCard.link, deleteCard);
    cardsList.append(newCard);
});
