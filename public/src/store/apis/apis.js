import Axios from 'axios';

export const userApis = {
  signUp: (data) => Axios.post('/api/signup', data),
  logIn: (data) => Axios.post('/api/login', data),
  getData: (id) => Axios.get(`/api/${id}`),
};

export const boardApis = {
  create: (data) => Axios.post('/api/board', data),
  getAll: () => Axios.get('/api/board'),
  getOne: (id) => Axios.get(`/api/board/${id}`),
  addMember: (data) => Axios.put(`/api/board/${data.id}`, data),
  update: (data) => Axios.patch(`/api/board/${data._id}`, data),
};

export const listApis = {
  create: (data) => Axios.post(`/api/list/${data.boardId}`, data),
  update: (data) => Axios.patch(`/api/list/${data.boardId}/${data.listId}`, data),
  updateOrder: (data) => Axios.put(`/api/list/${data.boardId}`, data),
  delete: (data) => Axios.delete(`/api/list/${data.boardId}/${data.listId}`),
};

export const cardApis = {
  create: (data) => Axios.post(`/api/card/${data.boardId}`, data),
  update: (data) => Axios.put(`/api/card/${data.boardId}/${data.cardId}`, data.data),
  delete: (data) => Axios.delete(`/api/card/${data.boardId}/${data.listId}/${data.cardId}`),
  createComment: (data) => Axios.patch(`/api/card/create/${data.boardId}/${data.cardId}`, data),
  removeComment: (data) => Axios.patch(`/api/card/remove/${data.boardId}/${data.cardId}`, data),
  updateLocation: (data) => Axios.put(`/api/card/updateLocation/${data.boardId}/${data.cardId}`, data),
};
