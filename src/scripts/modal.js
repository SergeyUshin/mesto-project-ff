export function openPopup(popupElement) {
    popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeKeybord);
    document.addEventListener("mousedown", closeOverlau);
  }
  
  export function closePopup(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeKeybord);
    document.removeEventListener("mousedown", closeOverlau);
  }
  
 export function addPopup(name, btn) {
    btn.addEventListener("click", function () {
      openPopup(name);
    });
  }

  function closeKeybord(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  function closeOverlau(evt) {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (evt.target === openedPopup) {
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }