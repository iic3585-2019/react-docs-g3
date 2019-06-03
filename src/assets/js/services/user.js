import jsonRequest from './jsonRequest';

export default {
  async signIn(data) {
    return jsonRequest('/signin', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async signOut() {
    return jsonRequest('/signIn', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async get(userId) {
    return jsonRequest(`/users/${userId}`);
  },
};
