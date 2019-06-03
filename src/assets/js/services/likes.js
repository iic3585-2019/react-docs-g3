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
  async putLike(likeType, entity) {
    const { id } = entity;
    const route =
      likeType === 'post' ? `/posts/${id}/like` :
        `/comments/${id}/like`;

    return jsonRequest(route, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  },

  async destroyLike(likeType, objectId, likeId) {
    const route = likeType === 'post' ? `/posts/${objectId}/likes/${likeId}/unlike` :
      `/comments/${objectId}/likes/${likeId}/unlike`;

    return jsonRequest(route, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  },
};
