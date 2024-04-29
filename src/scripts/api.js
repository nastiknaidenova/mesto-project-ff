const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/',
    groupName: 'wff-cohort-12',
    headers: {
        authorization: '99703b1e-7ce0-4717-b386-e423a10c9b54',
        'Content-Type': 'application/json'
    }
}

const checkResult = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCardsFromServer = () => {
    return fetch(apiConfig.baseUrl + apiConfig.groupName + '/cards', {
        headers: {
            authorization: apiConfig.headers.authorization,
        }
    })
    .then(res => checkResult(res));
}

export const getUser = () => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/users/me', {
        headers: {
            authorization: apiConfig.headers.authorization
        }
    })
    .then(res => checkResult(res));
}

export const setUser = (name, about) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        },
        body: JSON.stringify({
            name,
            about
        })
    })
    .then(res => checkResult(res));
}

export const setCard = (name, link) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/cards', {
        method: 'POST',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        },
        body: JSON.stringify({
            name,
            link
        })
    })
    .then(res => checkResult(res));
} 
  
export const deleteCardFromServer = (id) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/cards/' + id, {
        method: 'DELETE',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        }
    })
    .then(res => checkResult(res));
}
  
export const setLike = (id) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/cards/likes/' + id, {
        method: 'PUT',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        }
    })
    .then(res => checkResult(res));
} 
  
export const unsetLike = (id) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/cards/likes/' + id, {
        method: 'DELETE',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        }
    })
    .then(res => checkResult(res));
}

export const setAvatar = (src) => {
    return fetch(
        apiConfig.baseUrl + apiConfig.groupName + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.headers.authorization,
            'Content-Type': apiConfig.headers["Content-Type"]
        },
        body: JSON.stringify({
            avatar: src,
        })
    })
    .then(res => checkResult(res));
}
