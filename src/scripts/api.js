const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'cc14fb38-7814-4e4e-a307-e3c1871d3354',
      'Content-Type': 'application/json'
    }
  }

  const userList = () => {
    fetch('https://nomoreparties.co/v1/:cohortId/users/me', {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }