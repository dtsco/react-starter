import axios from 'axios';
import Qs from 'qs';

axios.defaults.headers.common['Authorization'] = `OAuth ${localStorage.getItem(
  'access_token',
)}`;

axios.defaults.paramsSerializer = (params) => {
  return Qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
};

function parseJSON(response = {}) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function checkStatus(noCatchAuth) {
  return ({ response = {} }) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    if (!noCatchAuth && response.status === 401) {
      localStorage.clear();
      document.location.assign('/#/auth');
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };
}

export default function request(url, options, noCatchAuth) {
  return axios(url, options).then(parseJSON).catch(checkStatus(noCatchAuth));
}
