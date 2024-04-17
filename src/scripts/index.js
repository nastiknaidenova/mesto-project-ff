import '../css/index.css';
import initialCards from './cards.js';
import { createCard, handleDeleteCard, handleCardLike } from './card.js';
import {
    openPopupWindow, closePopupWindow, addCloseByClickListeners
} from './modal.js';


// DOM Nodes
// Page Elements
const cardsList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
// Popups
const allPopups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
// Popup Elements
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
// Forms
const formEdit = document.forms.namedItem('edit-profile');
const formAdd = document.forms.namedItem('new-place');


// Image Handler
const handlePopupImage = (link, name) => {
    openPopupWindow(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
};


// Submit Handlers
// Edit Profile Handler
const handleEditProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = formEdit.elements.name.value;
    profileDescription.textContent = formEdit.elements.description.value;
    closePopupWindow(popupTypeEdit);
}

// Add Card Handler
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = createCard(
        formAdd.elements.place__name.value, formAdd.elements.link.value,
        handleDeleteCard, handlePopupImage, handleCardLike
    );
    cardsList.prepend(newCard);
    closePopupWindow(popupTypeNewCard);
    evt.target.reset();
}


// Create Initial Cards When Opening The Page
initialCards.forEach((initialCard) => {
    const newCard = createCard(
        initialCard.name, initialCard.link, handleDeleteCard,
        handlePopupImage, handleCardLike
    );
    cardsList.append(newCard);
});


// Listeners
// Click Listeners
editProfileButton.addEventListener('click', () => {
    openPopupWindow(popupTypeEdit);
    formEdit.elements.name.value = profileTitle.textContent;
    formEdit.elements.description.value = profileDescription.textContent;
});
addProfileButton.addEventListener('click', () => {
    openPopupWindow(popupTypeNewCard)
});
addCloseByClickListeners(allPopups);
// Submit Listeners
formEdit.addEventListener('submit', handleEditProfileFormSubmit);
formAdd.addEventListener('submit', handleAddCardFormSubmit);
