import jsonRequest from './jsonRequest';

export default {
  async get(courseNumber) {
    return jsonRequest(`/courses/${courseNumber}`);
  },

  async getLinks(courseNumber) {
    return jsonRequest(`/courses/${courseNumber}/links`);
  },

  async getFiles(courseNumber) {
    return jsonRequest(`/courses/${courseNumber}/files`);
  },

  async getTeachers(courseNumber) {
    return jsonRequest(`/courses/${courseNumber}/teachers/`);
  },
};
