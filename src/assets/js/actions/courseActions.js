import courseService from '../services/course';
import linksService from '../services/link';
import { courseConstants } from '../constants';

const requestFiles = courseNumber => ({
  type: courseConstants.FETCH_FILES,
  courseNumber,
});

export const removeActualCourse = () => ({
  type: courseConstants.REMOVE_ACTUAL_COURSE,
  payload: null,
});

const receiveFiles = (courseNumber, res) => ({
  type: courseConstants.FETCH_COURSE_FILES_FULLFILED,
  payload: res,
  courseNumber,
});

export const fetchFiles = courseNumber => async (dispatch) => {
  dispatch(requestFiles(courseNumber));
  const res = await courseService.getFiles(courseNumber);
  dispatch(receiveFiles(courseNumber, res));
};

const requestCourse = courseNumber => ({
  type: courseConstants.FETCH_COURSE,
  courseNumber,
});

const receiveCourse = (courseNumber, res) => ({
  type: courseConstants.FETCH_COURSE_FULLFILED,
  payload: res.course,
  courseNumber,
});

export const fetchCourse = courseNumber => async (dispatch) => {
  dispatch(requestCourse(courseNumber));
  const res = await courseService.get(courseNumber);
  dispatch(receiveCourse(courseNumber, res));
};

const requestLinks = courseNumber => ({
  type: courseConstants.FETCH_COURSE_LINKS,
  courseNumber,
});

const receiveLinks = (courseNumber, res) => ({
  type: courseConstants.FETCH_COURSE_LINKS_FULLFILED,
  payload: res,
  courseNumber,
});

export const fetchLinks = courseNumber => async (dispatch) => {
  dispatch(requestLinks(courseNumber));
  const res = await courseService.getLinks(courseNumber);
  dispatch(receiveLinks(courseNumber, res));
};

const putLinkRequest = data => ({
  type: courseConstants.PUT_COURSE_LINK,
  data,
});

const recieveLink = (data, res) => ({
  type: courseConstants.PUT_COURSE_LINK_FULLFILED,
  payload: res,
  data,
});

export const putLink = data => async (dispatch) => {
  dispatch(putLinkRequest(data));
  const res = await linksService.putLink(data);
  dispatch(recieveLink(data, res));
};

const requestTeachers = courseNumber => ({
  type: courseConstants.FETCH_COURSE_TEACHERS,
  courseNumber,
});

const receiveTeachers = (courseNumber, res) => ({
  type: courseConstants.FETCH_COURSE_FULLFILED,
  payload: res,
  courseNumber,
});

export const fetchTeachers = courseNumber => async (dispatch) => {
  dispatch(requestTeachers(courseNumber));
  const res = await courseService.getTeachers(courseNumber);
  dispatch(receiveTeachers(courseNumber, res));
};

export default {
  fetchFiles,
  fetchCourse,
  fetchLinks,
  fetchTeachers,
  putLink,
  removeActualCourse,
};
