import axios from "axios";

// export const API = `http://localhost:6969/api/`;
// export const APP_BASE_URL = "http://localhost:3000/";
export const API = `https://ngl-2.cyclic.app/api/`;
export const APP_BASE_URL = "https://anonify.in/";

export const generatingPinForUser = (payload) => {
  return axios.post(`${API}generatingPinForUser`, payload);
};

export const gettingUserBasedOnPin = (payload) => {
  return axios.post(`${API}gettingUserBasedOnPin`, payload);
};

export const createUserQuestion = (payload) => {
  return axios.post(`${API}createUserQuestion`, payload);
};

export const saveViewerResponse = (payload) => {
  return axios.post(`${API}saveViewerResponse`, payload);
};

export const getAllQuestionsByUser = (payload) => {
  return axios.post(`${API}getAllQuestionsByUser`, payload);
};

export const getQuestionByQuestionId = (payload) => {
  return axios.post(`${API}getQuestionByQuestionId`, payload);
};

export const getAllResponseByViewer = (payload) => {
  return axios.post(`${API}getAllResponseByViewer`, payload);
};

export const checkUserNameExists = (payload) => {
  return axios.post(`${API}checkUserNameExists`, payload);
};
