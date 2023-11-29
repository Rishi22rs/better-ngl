import axios from "axios";

// export const API = `http://localhost:6699/`;
export const API = `https://ngl-2.cyclic.app/`;
export const APP_BASE_URL = "https://ngl2.netlify.app/";
// export const APP_BASE_URL = "http://localhost:3000/";

export const generatingPinForUser = (payload) => {
  return axios.post(`${API}api/generatingPinForUser`, payload);
};

export const gettingUserBasedOnPin = (payload) => {
  return axios.post(`${API}api/gettingUserBasedOnPin`, payload);
};

export const createUserQuestion = (payload) => {
  return axios.post(`${API}api/createUserQuestion`, payload);
};

export const saveViewerResponse = (payload) => {
  return axios.post(`${API}api/saveViewerResponse`, payload);
};

export const getAllQuestionsByUser = (payload) => {
  return axios.post(`${API}api/getAllQuestionsByUser`, payload);
};

export const getQuestionByQuestionId = (payload) => {
  return axios.post(`${API}api/getQuestionByQuestionId`, payload);
};

export const getAllResponseByViewer = (payload) => {
  return axios.post(`${API}api/getAllResponseByViewer`, payload);
};

export const checkUserNameExists = (payload) => {
  return axios.post(`${API}api/checkUserNameExists`, payload);
};
