export {
    openPopupWindow, closePopupWindow, addCloseByClickListeners
};

const openPopupWindow = (modalPopup) => {
    modalPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseByEscape);
}

const closePopupWindow = (modalPopup) => {
    modalPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEscape);
}

const handleCloseByClick = (evt) => {
    if (evt.target === evt.currentTarget
        || evt.target.classList.contains('popup__close')) {
        closePopupWindow(evt.currentTarget);
    }
}

const handleCloseByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopupWindow(openedPopup);
    }
}

const addCloseByClickListeners = (allPopups) => {
    allPopups.forEach((popup) => {
        popup.addEventListener('click', handleCloseByClick)
    })
}