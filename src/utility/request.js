import axios from 'axios';

/**
 * Функция для выполнения HTTP-запросов.
 *
 * @param {string} method - HTTP-метод для запроса ('get', 'post', 'put', 'delete' и т.д.).
 * @param {string} url - URL-адрес для запроса.
 * @param {Object} [data=null] - Данные, которые нужно отправить с запросом. Обычно используется с 'post' и 'put'.
 * @param {Object} showError - Объект ref из Vue 3 для отслеживания ошибок во время выполнения запроса.
 *
 * @returns {Promise} Promise с результатом запроса.
 * @throws {Error} Если в процессе выполнения запроса произошла ошибка.
 */
export async function makeRequest(method, url, showError = null, data = null) {
  try {
    const options = {
      method,
      url,
      data,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if ( showError === null ) throw error;
    else {
      showError.value = error.response.status === (403 || 401);
      throw error;
    }
  }
}

