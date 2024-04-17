export { createCard, handleDeleteCard, handleCardLike };

const createCard = (
    cardName, cardLink, deleteHandler, imageHandler, likeHandler
) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardDescriptionTitle = cardItem.querySelector('.card__title');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardLikeButton = cardItem.querySelector('.card__like-button');

    cardImage.alt = cardName;
    cardImage.src = cardLink;
    cardDescriptionTitle.textContent = cardName;

    cardDeleteButton.addEventListener('click', () => {
        deleteHandler(cardItem);
    });
    cardImage.addEventListener('click', () => {
        imageHandler(cardLink, cardName);
    });
    cardLikeButton.addEventListener('click', (evt) => {
        likeHandler(evt);
    });

    return cardItem;
}

const handleCardLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}

const handleDeleteCard = (cardItem) => { cardItem.remove(); }