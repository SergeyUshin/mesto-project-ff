const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "cc14fb38-7814-4e4e-a307-e3c1871d3354",
    "Content-Type": "application/json",
  },
};

export const userList = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const user = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addlikes = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers
   }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deletelikes = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
   }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}