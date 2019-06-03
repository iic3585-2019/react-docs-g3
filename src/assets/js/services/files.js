import jsonRequest from './jsonRequest';

export default {
  async get(props) {
    return jsonRequest(`/courses/${props.courseNumber}/files/`);
  },

  async removeFile(props) {
    return jsonRequest(`/files/${props.file.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });
  },
};
