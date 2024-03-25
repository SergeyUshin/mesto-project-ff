export const configSeting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input-error_active',
    errorClass: 'popup__input-errore'
  }

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
 const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
  
    if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity((inputElement.dataset.errorMessage));
  } 
  else {
  inputElement.setCustomValidity("");
  }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
 const toggleButtonState = (inputList, buttonElement) => {
    const hasInvalid = inputList.some((inputElement) => !inputElement.validity.valid);
  
    if (hasInvalid) {
      buttonElement.disabled = true;
      buttonElement.classList.add('button_inactive');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('button_inactive');
    }
  };
  
 const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

 export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
  }; 
  
 export function clearValidation(formElement, settings)  {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
  
    toggleButtonState(inputList, buttonElement);
  };