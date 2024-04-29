export { createCard, handleDeleteCard, handleCardLike };
import { deleteCardRequest, setLike, deleteLike } from "./api";

const createCard = (
    card, author, deleteHandler, imageHandler, likeHandler
) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardDescriptionTitle = cardItem.querySelector('.card__title');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardLikeButton = cardItem.querySelector('.card__like-button');

    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardDescriptionTitle.textContent = card.name;
    cardLikeButton.textContent = card.likes.length;
    if (author != card.owner._id) {
        cardDeleteButton.disabled = true;
        cardDeleteButton.hidden = true;
    }

    cardDeleteButton.addEventListener('click', () => {
        deleteHandler(card._id, cardItem);
    });
    cardImage.addEventListener('click', () => {
        imageHandler(card.link, card.name);
    });
    cardLikeButton.addEventListener('click', (evt) => {
        likeHandler(
            card._id, evt.target,
            evt.target.classList.contains('card__like-button_is-active')
        );
    });

    return cardItem;
}

const toggleLike = (buttonLikeElement, isLiked, likesCount) => {
    if (!isLiked) {
        buttonLikeElement.classList.add('card__like-button_is-active');
    } 
    else {
        buttonLikeElement.classList.remove('card__like-button_is-active');
    }
    buttonLikeElement.textContent = likesCount;
}

const handleCardLike = (cardId, buttonLikeElement, isLiked) => {
    if (isLiked) {
        deleteLike(cardId)
            .then((result) => {
                toggleLike(buttonLikeElement, isLiked, result.likes.length)
            })
            .catch((err) => {
                console.log(err);
            });
    } 
    else {
        setLike(cardId)
            .then((result) => {
                toggleLike(buttonLikeElement, isLiked, result.likes.length)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const handleDeleteCard = (cardId, cardItem) => { 
    deleteCardRequest(cardId)
        .then((res) => {
            cardItem.remove(); 
        })
        .catch((err) => {
            console.log(err);
        });
}
