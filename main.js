(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-10",headers:{authorization:"cc14fb38-7814-4e4e-a307-e3c1871d3354","Content-Type":"application/json"}},t=function(){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}function c(e){e.target===e.currentTarget&&r(e.target)}function a(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),a=o.querySelector(".card__image"),u=o.querySelector(".card__like-button");return a.src=e.link,a.alt=e.name,o.querySelector(".card__title").textContent=e.name,a.addEventListener("click",(function(){return r(e)})),u.addEventListener("click",(function(){return n(u,e._id)})),c.addEventListener("click",(function(){return t(o,e._id)})),l(),o}function u(t,n){!function(t){(function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(t).then((function(e){console.log("Карточка успешно удалена с сервера:",e)})).catch((function(e){console.log("Произошла ошибка при удалении карточки с сервера:",e)}))}(n),t.remove()}function i(t,n){t.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(){t.classList.remove("card__like-button_is-active"),l()})).catch((function(e){console.log("Произошла ошибка при удалении лайка с сервера:",e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(){t.classList.add("card__like-button_is-active"),l()})).catch((function(e){console.log("Произошла ошибка при добавлении лайка на сервер:",e)}))}function l(){t().then((function(e){e.forEach((function(e,t){var n=document.querySelectorAll(".counter")[t];n&&(n.textContent=e.likes.length)}))}))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"form__input-error_active",errorClass:"popup__input-errore"},d=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input-error"),n.classList.remove("form__input-error_active"),n.textContent=""},f=function(e,t){e.some((function(e){return!e.validity.valid}))?(t.disabled=!0,t.classList.add("button_inactive")):(t.disabled=!1,t.classList.remove("button_inactive"))};function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){d(e,t)})),f(n,r)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m,v=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),h=document.querySelectorAll(".popup__close"),b=document.querySelector(".popup_type_image"),S=b.querySelector(".popup__image"),q=b.querySelector(".popup__caption"),k=document.querySelector(".popup_type_new-card"),E=k.querySelector(".popup__input_type_card-name"),L=k.querySelector(".popup__input_type_url"),g=document.querySelector(".places__list"),j=document.querySelectorAll(".popup"),C=document.querySelector(".popup_type_edit"),A=C.querySelector(".popup__input_type_name"),x=C.querySelector(".popup__input_type_description"),P=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),T=document.querySelector(".popup_new_avatar"),O=T.querySelector(".popup__input_new-avatar"),D=document.querySelectorAll(".popup__button");function I(e){S.src=e.link,S.alt=e.name,q.textContent=e.name,n(b)}function B(e){e?D.forEach((function(e){e.textContent="Сохранение..."})):D.forEach((function(e){e.textContent="Сохранить"}))}Promise.all([t(),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];o.forEach((function(e){var t=a(e,u,i,I);if(e.likes.some((function(e){return e._id===c._id}))){var n=t.querySelector(".card__like-button");n&&n.classList.add("card__like-button_is-active")}if(e.owner._id===c._id){var r=t.querySelector(".card__delete-button");r&&r.classList.add("card__delete-button_activ")}g.append(t)})),U.style.backgroundImage="url(".concat(c.avatar,")"),P.textContent=c.name,w.textContent=c.about})).catch((function(e){console.log("Произошла ошибка при загрузке данных:",e)})),h.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){r(t)}))})),j.forEach((function(e){e.addEventListener("mousedown",c)})),U.addEventListener("click",(function(){O.value="",p(T,s),n(T)})),y.addEventListener("click",(function(){E.value="",L.value="",p(k,s),n(k)})),v.addEventListener("click",(function(){A.value=P.textContent,x.value=w.textContent,p(C,s),n(C)})),T.addEventListener("submit",(function(t){t.preventDefault();var n,o=O.value;B(!0),(n={avatar:o},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),r(T)})).catch((function(e){console.error("Произошла ошибка при обновлении аватара:",e)})).finally((function(){B(!1)}))})),C.addEventListener("submit",(function(t){t.preventDefault();var n={name:A.value,about:x.value};B(!0),function(t){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){P.textContent=e.name,w.textContent=e.about,r(C)})).catch((function(e){console.error(e)})).finally((function(){B(!1)})),r(C)})),k.addEventListener("submit",(function(t){t.preventDefault();var n,o={name:E.value,link:L.value};B(!0),(n=o,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=a(e,u,i,I),n=t.querySelector(".card__delete-button");n&&n.classList.add("card__delete-button_activ"),g.prepend(t),r(k)})).catch((function(e){console.error(e)})).finally((function(){B(!1)}))})),m=s,Array.from(document.querySelectorAll(m.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);f(n,r),n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input-error"),r.textContent=n,r.classList.add("form__input-error_active")}(e,t,t.validationMessage)}(e,t),f(n,r)}))}))}(e,m)}))})();