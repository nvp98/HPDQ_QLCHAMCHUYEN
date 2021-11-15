import { fetchApi } from '../Utils';

export const postLogin = (body) => {
    return fetchApi('/login', 'POST',body);
  };