import jsonRequest from './jsonRequest';

export default {
  async get(props) {
    return jsonRequest(`/courses/${props.courseNumber}/links/`);
  },

  async removeLink(data) {
    return jsonRequest(`/courses/${data.course.courseNumber}/links/${data.link.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async putLink(data) {
    return jsonRequest(`/courses/${data.course.courseNumber}/links/new`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
