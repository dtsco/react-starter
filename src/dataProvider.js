import get from 'lodash/get';
import { BASE_API_PATH } from 'api';
import { GET_LIST, GET_SINGLE, CREATE, UPDATE, DELETE } from 'utils/fetch';
import httpClient from 'utils/request';
import { method } from 'lodash';
import qs from 'qs';

export default () => ({
  [GET_LIST]: (apiKey, params, meta) => {
    const url = `${BASE_API_PATH}${apiKey}`;
    const query = {
      ...params,
      page: get(params, 'page'),
      size: get(params, 'size'),
      sort: get(params, 'sort.field'),
      order: get(params, 'sort.order'),
      filter: get(params, 'filter', {}),
      limit: get(params, 'limit'),
    };
    return httpClient(url, { params: query }).then((response) => {
      return {
        data: response,
      };
    });
  },
  [GET_SINGLE]: (apiKey, params, meta) => {
    const url = `${BASE_API_PATH}${apiKey}`;
    return httpClient(`${url}/${meta.entityId}`).then((response) => {
      return {
        data: response,
      };
    });
  },
  [CREATE]: (apiKey, params) => {
    const url = `${BASE_API_PATH}${apiKey}`;
    return httpClient(url, { method: 'post', data: params });
  },
  [UPDATE]: (apiKey, params) => {
    const url = `${BASE_API_PATH}${apiKey}`;
    const { id } = Object.assign({}, params);
    delete params.id;
    return httpClient(`${url}/${id ? id : ''}`, {
      method: 'patch',
      data: params,
    });
  },
  [DELETE]: (apiKey, params) => {
    const url = `${BASE_API_PATH}${apiKey}`;
    return httpClient(`${url}/${params.id}`, { method: 'delete' });
  },
});
