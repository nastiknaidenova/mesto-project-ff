import '../css/index.css';
import { createCard, handleDeleteCard, handleCardLike } from './card.js';
import {
    openPopupWindow, closePopupWindow, addCloseByClickListeners
} from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
    getCardsFromServer, getUser, setUser, setCard, setAvatar 
} from './api.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// DOM Nodes
// Page Elements
const cardsList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
// Forms
const formEdit = document.forms.namedItem('edit-profile');
const formEditAvatar = document.forms.namedItem('edit-avatar');
const formAdd = document.forms.namedItem('new-place');
// Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const profileFormSubmitButton = formEdit.querySelector('.popup__button');
const cardFormSubmitButton = formAdd.querySelector('.popup__button');
const avatarFormSubmitButton = formEditAvatar.querySelector('.popup__button');
// Popups
const allPopups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
// Popup Elements
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

let userId;

// Image Handler
const handlePopupImage = (link, name) => {
    openPopupWindow(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}


// Submit Handlers
// Edit Profile Handler
const handleEditProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileFormSubmitButton.textContent = 'Сохранение...';
    setUser(formEdit.elements.name.value, formEdit.elements.description.value)
        .then((user) => {
            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;
            closePopupWindow(popupTypeEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=> {
            profileFormSubmitButton.textContent = 'Сохранить';
        });
}

// Add Card Handler
const handleAddCardFormSubmit = (evt) => {
    evt.preventDefault();
    cardFormSubmitButton.textContent = 'Сохранение...';
    setCard(formAdd.elements['place__name'].value, formAdd.elements.link.value)
        .then(card => {
            const newCard = createCard(card, userId,
                handleDeleteCard, handlePopupImage, handleCardLike
            ); 
            cardsList.prepend(newCard);  
            clearValidation(formAdd, validationConfig);
            closePopupWindow(popupTypeNewCard);
            evt.target.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=> {
            cardFormSubmitButton.textContent = 'Сохранить';
        });
}

// Add Avatar Handler
const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();
    avatarFormSubmitButton.textContent = 'Сохранение...';
    setAvatar(formEditAvatar.elements.link.value)
        .then((user) => {
            profileImage.style.backgroundImage = 'url(' + user.avatar + ')';
            formEditAvatar.reset();
            clearValidation(formEditAvatar, validationConfig);
            closePopupWindow(popupTypeEditAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=> {
            avatarFormSubmitButton.textContent = 'Сохранить';
        });
}

// Create Initial Cards When Opening The Page
const renderCard = (card, author) => {
    const newCard = createCard(
        card, author, handleDeleteCard, handlePopupImage, handleCardLike
    );
    cardsList.append(newCard);
}

// Create Promises
Promise.all([getUser(), getCardsFromServer()])
    .then(([user, cards]) => {
        userId = user._id
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = 'url(' + user.avatar + ')';
        cards.forEach((card) => {
            renderCard(card, userId);
        });
    })
    .catch((err) => {
        console.log(err);
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
profileImage.addEventListener('click', () => {
    openPopupWindow(popupTypeEditAvatar);
});
addCloseByClickListeners(allPopups);
// Submit Listeners
formEdit.addEventListener('submit', handleEditProfileFormSubmit);
formAdd.addEventListener('submit', handleAddCardFormSubmit);
formEditAvatar.addEventListener('submit', (evt) => handleAvatarFormSubmit(evt));

// Enable Validation
enableValidation(validationConfig);
