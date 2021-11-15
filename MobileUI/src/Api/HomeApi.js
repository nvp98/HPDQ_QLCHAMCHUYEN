import { fetchApi } from '../Utils';

export const getBai = () => {
    return fetchApi('/bai', 'GET');
  };
export const getXe = () => {
    return fetchApi('/xe', 'GET');
  };
export const getNhaThau = () => {
    return fetchApi('/nhathau', 'GET');
  };
export const getVatTu = () => {
    return fetchApi('/vattu', 'GET');
  };
export const getChuyenXeID = id => {
    return fetchApi(`/chuyenxe/xe/${id}`, 'GET');
  };
export const postChuyenXe = (body) => {
    return fetchApi('/chuyenxe', 'POST',body);
  };
export const UpdateChuyenXeID = (id,body) => {
    return fetchApi(`/chuyenxe/${id}`, 'POST',body);
  };