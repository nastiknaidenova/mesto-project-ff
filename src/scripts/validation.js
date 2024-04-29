export { enableValidation, clearValidation };

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(
        validationConfig.formSelector
    ));
    formList.forEach((form) => {
        setEventListeners(form, validationConfig);
    });
};

const setEventListeners = (form, validationConfig) => {
    const inputList = Array.from(form.querySelectorAll(
        validationConfig.inputSelector
    ));
    const submitButton = form.querySelector(
        validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, submitButton, validationConfig);
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            isValid(form, input, validationConfig);
            toggleButtonState(inputList, submitButton, validationConfig);
        });
    });
};
  
const isValid = (form, input, validationConfig) => {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } 
    else {
        input.setCustomValidity("");
    };
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, validationConfig);
    } 
    else {
        hideInputError(form, input, validationConfig);
    };
}
  
const showInputError = (form, input, errorMessage, validationConfig) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}
  
const hideInputError = (form, input, validationConfig) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
}
  
const toggleButtonState = (inputList, button, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        button.disabled = true;
        button.classList.add(validationConfig.inactiveButtonClass);
    } 
    else {
        button.disabled = false;
        button.classList.remove(validationConfig.inactiveButtonClass);
    };
}; 
  
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};
  
const clearValidation = (profileForm, validationConfig) => {
    const inputList = Array.from(profileForm.querySelectorAll(
        validationConfig.inputSelector
    ));
    const submitButton = profileForm.querySelector(
        validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, submitButton, validationConfig);
    inputList.forEach((input) => {
        hideInputError(profileForm, input, validationConfig)
    });
};
