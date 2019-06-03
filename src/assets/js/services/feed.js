async function jsonRequest(path, options = {}) {
  const result = await fetch(path, {
    ...options,
    headers: { ...options.headers, Accept: 'application/json' },
  });
  const json = await result.json();
  if (result.status !== 200) {
    throw Object.assign(new Error(), json);
  }

  return json;
}

export default {
  async get(props) {
    switch (props.feedType) {
      case 'dog':
        return jsonRequest(`/dog/${props.dogId}/posts`);
      case 'home':
        return jsonRequest('/');
      case 'user':
        return jsonRequest(`/user/${props.userId}/posts`);
      default:
        return jsonRequest('/');
    }
  },
};
