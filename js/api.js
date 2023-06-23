const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const GET_DATA_URL = `${BASE_URL}/data`;
const SEND_DATA_URL = BASE_URL;

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const GET_DATA_ERROR = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const SEND_DATA_ERROR = 'Не удалось отправить форму. Попробуйте ещё раз';

const sendAPIRequest = (route, errorText, onSuccess, onError, method = METHOD_GET, body = null) => {
    fetch(route, {method, body})
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Ошибка: ${response.statusText} (${response.status})`);
        })
        .then(onSuccess)
        .catch((e) => onError(`${errorText}. ${e.message}`));
}

const getData = (onSuccess, onError) => sendAPIRequest(GET_DATA_URL, GET_DATA_ERROR, onSuccess, onError);
const sendData = (onSuccess, onError, body) => sendAPIRequest(
    SEND_DATA_URL, SEND_DATA_ERROR, onSuccess, onError, METHOD_POST, body);

export {getData, sendData};
