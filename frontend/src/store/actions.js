import axios from 'axios';

/**
 * @summary Initialize store on first page load
 */
export const initStore = ({ commit }) => {
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (storedUserInfo !== null && storedUserInfo !== undefined) {
    commit('setUserInfo', storedUserInfo);
  }
};

export const saveUserInfo = ({ commit }, payload) => {
  localStorage.setItem('userInfo', JSON.stringify(payload));

  commit('setUserInfo', payload);
};

/**
 * @summary fetch ingridient metrics
 */
export const fetchMetrics = async ({ commit }) => {
  const metrics = await axios
    .get(`${process.env.VUE_APP_API_URL}/metrics`)
    .then((res) => res?.data?.metrics ?? [])
    .catch((error) => console.error('Error fetching metrics', error));

  if (metrics) {
    commit('setMetrics', metrics);
  }
};
